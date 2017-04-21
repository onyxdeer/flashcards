'use strict';

import util from './util.js';
import request from 'axios';
import Client from './client.js';
import Card from './card.js';
import Promise from 'bluebird';

/*
  AI class responsible with the following functionalities:
  speech to text and speech recognition (via google API)
  text to speech (via responsiveVoice.js)
  and active command listening (via annyang.js)
*/
const AI = class {
  constructor(name, data) {
    this.name = name;
    // this.commands = util.commands;
    // this._initAnnyang(util.commands);
    // this._getBento(bentoId)
    //                 .then( data => this._processData(data) )
    //                 .then( processed => this.data = processed );
    // console.log('data is: ', data)
    this.store = this._processData(data)
    this.cards = this.mapData(this.store)
    console.log('cards are: ', this.cards)
    this.commands = this._getCommands();
    this._initAnnyang(this.commands);
    this.socket = window.io();
    // this.client = client('');
  }

  /*
   Inits annyang voice listener with the commands inside AI class
   @private
   @param {object} key: function names, value: functions to be executed with the names are 
      spoken
  */
  _initAnnyang(commands) {
    if (window.annyang) {
      window.annyang.addCommands(commands);
      window.annyang.start();
      window.annyang.debug(true);
    };
  }
  

  _initClient(configs){
    const SPEECHURL = 'localhost:9191';
    const configurations = {
      SPEECHURL,
      clientId: util.uuid()
    };
    this.configs = configurations
    this.client = Client(configurations);
    return this.client
  }

  /*
    Retrieves all the necessary bento & noris in order to have a Voice Review Session
    @private
    @return {Promise:object} bento & corresponding noris and relevant display information wrapped in Promise
  */
  _getBento(bentoId) {
    const URL = '/api/bentos';
    const params = { 
      bentoId
    }
    return request.get(URL, { params })
  }

  _getNoris(bentoId) {
    const URL = '/api/noris';
    const params = { 
      bentoId
    }
    return request.get(URL, { params })
  }

  /*
    @private
    @param {object} the data to be processed to the correct format for AI to iterate through
    @return {object} 
  */
  _processData( data ) {
    let newData = data.map(function(item){ 
      let result = {};
      if(item && item.text_front){
        let parsed = JSON.parse(item.text_front);
        if(parsed&&parsed.blocks&&parsed.blocks[0]&&parsed.blocks[0].text){
          result['front'] =  parsed.blocks[0].text;
        }
      }
      if(item && item.text_back){
        let parsed = JSON.parse(item.text_back);
        if(parsed&&parsed.blocks&&parsed.blocks[0]&&parsed.blocks[0].text){
          result['back'] =  parsed.blocks[0].text;
        }
      }
      return result;
    });
    return newData;
  }


  /*
    Retrieves all the methods in AI class
    removes all the non voice triggering methods
    @private
    @return {object} used to initialize annyang
  */
  _getCommands() {
    // const commandNames = Object.getOwnPropertyNames( AI.prototype );
    // let commandObj = {};
    // let voiceCommands = this._removePrivateMethods(commandNames);
    // voiceCommands.map(command => commandObj[command] = AI.prototype[command] );
    // return commandObj;

    const commands = {
      'start': () => {
        console.log('start triggered')
        let configs = {}
        this.startSession( configs );
      },
      'hello': () => {
        console.log('hello function called')
        this.read('hello there, my name is norica, here to help you memorize your noris ')
      },
      'next': () => {
        console.log('next function called!')
      },
      'go' : () => {
        console.log('go fucntion called')
      },
      'repeat': () => {
        console.log('repeat function called')
      },
      'redo': () => {
        console.log('redo function called')
      },
      'previous': () => {
        console.log('previous function called')
      },
      'retry': () => {
        console.log('retry function called')
      },
      'answer': () => {
        console.log('answer function called')
      },
      'accent': () => {
        //another function alias called
        //say it as if you are *country name
        console.log('accent function called')
      }
    };
    return commands;
  }

  /*
    Helper function to check private methods via the underscore convention
    @private
    @param {string} the command name to be checked
    @return {boolean} true if it contains _
  */
  _isUnderScore(methodName) {
    firstCharIsUnderScore = methodName[0] === '_'
    return firstCharIsUnderScore;
  }

  /*
    Private helper function to filter all private methods
    starting from constructor, and then all 
    @private
    @param {array} all the method names in AI class
    @return {array} all the method in AI class that isn't a private method or constuctor
  */
  _removePrivateMethods(CommandsToRemove) {
    const CONSTRUCTOR = 'constructor';
    let nonePrivateMethods = CommandsToRemove
                        .filter(command => !this._isUnderScore(command))
                        .filter(command => command !== CONSTRUCTOR );
    
    return nonePrivateMethods;
  }

  /*
    Starts the Voice Review Session by initializing all necessary dependencies
    @param {object} any configurations for this session
    @return {AI instance} 
  */
  startSession(config) {
    this._initClient('ayyyyyyy')    
    // console.log('what is result of init client:', result)
    window.annyang.resume()
    if( !this.cards ) {
      console.error('data is yet to be retrieved')
      return this;
    }
    console.log('we have cards: ', this.cards)
    this.cards[0].next()
    return this;
  }
  /*
    ends the voice session and gracefully shut down all the clients
  */
  endSession() {
    window.annyang.pause()
    //speech client stop
  }

  /*
    resumes the current annyang session, invoked when finished listening for 
    microphone input from user to transfer data to speech server
  */
  resume() {
    window.annyang.resume();
  }

  /*
    temporarily pauses the session in order to allow recording microphone
    input from user to transfer data to speech server
  */
  pause() {
    window.annyang.pause();
  }

  startTransfer(){
    this.client.start(this.configs)
  }

  endTransfer(){
    this.client.end()
  }

  /*
    Command to voice text to speech using Responsive Voice
    @param {string} the string to transform to speech
    @return {AI instance}
  */
  say(text) {
    console.log('i am speaking: ', text)
    window.responsiveVoice.speak(text, "US English Female");
    return this;
  }
  // speakable(target){
  //   console.log('target func: ', target)
  // }

  read(text) {
    // let that = this
    return new Promise( (resolve, reject) => {
      console.log('Reading Card Front: ', text)
      this.resume()
      window.responsiveVoice.speak(text, "US English Female", {onstart: ()=>{ console.log('talking...')}, onend: resolve });
      // resolve()
    });
  }

  listen() {
    let that = this
    return new Promise( (resolve, reject) => {
      console.log('hello world i am listening!!')
      //shut down annyang this.pause()
      this.pause()
      this.startTransfer()
      resolve()
      //turn on client this.client.start()
      //resolve response from server

    });
  }
  /**
   * 
   * @param {*data} data 
   * @return {some more data}
   */
  next(chainFunctions) {
    const { read, listen } = chainFunctions;
    // console.log('myargs: ', args)
    // console.log('this: ', this)
    read(this.front)
      .then(() => {
        console.log('listening...')
        return listen()
      })
      .then(() => {
        console.log('EVERYTHING IS WORKING YAY')
        // return getResponse()
      })
      .catch(err => console.log(err))

  }

  validateStream(){
    // import google client here
  }

  /**
   * 
   * @param {Array} expect a list of noris to map into cards
   * @param {*} a list of card class objects 
   */
  mapData (noriList){
    let cardsList = [];
    const chainFunctions = {
      read: this.read.bind(this),
      listen: this.listen.bind(this)
    }
    for( let i = 0; i < noriList.length; i++ ){
      // let obj = {};
      let card = new Card(noriList[i])
      card.next = this.next.bind(card, chainFunctions)
      cardsList.push(card)
      // let nextCard = 
    };
    return cardsList;
  }
  
};

function speakable(target){
  console.log('target: ', target)
}
// var a = new AI('joe')


export default AI;