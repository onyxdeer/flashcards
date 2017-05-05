'use strict';

import util from './util.js';
import request from 'axios';
import Client from './client.js';
import Card from './card.js';
import Promise from 'bluebird';
import nlp from 'fuzzball';
import audio from 'browser-audio';



/*
  AI class responsible with the following functionalities:
  speech to text and speech recognition (via google API)
  text to speech (via responsiveVoice.js)
  and active command listening (via annyang.js)
*/
const AI = class {
  constructor(name, data) {
    this.name = name;
    this.sound = audio.create('./sounds/bell.mp3')
    const CLOUDURL = '54.193.62.15';
    // const PORT = ':8000'
    const HOSTURL = 'https://' + CLOUDURL
    // this.socket = window.io(HOSTURL);
    this.socket = window.io();
    this.socket.emit('chat message', 'ai.js client connected')
    // this.commands = util.commands;
    // this._initAnnyang(util.commands);
    // this._getBento(bentoId)
    //                 .then( data => this._processData(data) )
    //                 .then( processed => this.data = processed );
    // console.log('data is: ', data)
    this.store = this._processData(data);
    this.cards = this.mapData(this.store);
    this.current = 0;
    this.commands = this._getCommands();
    // this._initAnnyang(this.commands);
    this.results = [];
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
    const CLOUDURL = 'obento.fun';
    const PORT = ':9234'
    const LOCAL = 'localhost';
    const LOCALPORT = ':9191'
    console.log('WHAT IS: WINDOW HOST:', window.location.host)
    const SPEECHURL = window.location.host === CLOUDURL ? CLOUDURL + PORT : LOCAL + LOCALPORT

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

  /**
   * @private
   * @param {Array} the list to be trimmed and filtered with any front or back of the noris that has no words
   * @return {Array} filtered list
   */
  _filterIncompleteNoris(processedList){
    console.log('what is processed list given: ', processedList)
    let noIncomplete =  processedList.filter(i => {
      return i.front && i.front.length > 0 && i.back && i.back.length > 0
    })
    console.log('what is noIncomplete: ', noIncomplete)
    return noIncomplete
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
    let noIncompleteFrontAndBackList = this._filterIncompleteNoris(newData)
    return noIncompleteFrontAndBackList;
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
    this._initClient('client hello')    
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
    window.annyang.pause();
    console.log('stopping client')
    this.client.end();
    this.results = 0;
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

  /**
   * begins the transfer to google speech server utilizing our binary client
   */
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

  /**
   * reads the question prompt
   * @param {*string} text 
   * @return {*promise} 
   */
  read(text) {
    return new Promise( (resolve, reject) => {
      console.log('Reading: ', text)
      this.resume()
      window.responsiveVoice.speak(text, "US English Female", {onstart: ()=>{ console.log('talking...')}, onend: resolve });
    });
  }

  /**
   * listens for the answer transferred to the backend
   * @param {*obj} socket 
   */
  listen(socket) {
    let that = this
    return new Promise( (resolve, reject) => {
      console.log('hello world i am listening!!')
      this.pause()
      this.startTransfer()
      let end = this.endTransfer.bind(this)
      socket.on('transfer over', function({ data , clientId }){
          console.log('received data from backend: ', data)
          console.log('received data from client: ', clientId)
          console.log('debugging what clientID is: ', that.configs.clientId)
          if(clientId === that.configs.clientId){
            end()
            resolve(data)
          }
      })
    });
  }
  /**
   * this references Card object
   * instance references the ai object
   * @param {*data} data 
   * @return {some more data}
   */
  next({ read, listen, test=10, socket, instance }) {
    console.log('before id: ', instance.current)
    //RESTART CLIENT HERE
    let back = this.back
    let front = this.front
    read(front)
      .then(() => {
        console.log('listening...')
        return listen(socket)
      })
      .then((data) => {
        console.log('data heard is ...', data)
        let correctPercent = nlp.partial_ratio(back, data);
        let isCorrect = util.verifyAnswer(correctPercent)
        const correct = 'you are correct'
        const incorrect = 'sorry, not quite'
        const toRead = isCorrect ? correct : incorrect
        instance.results.push({ front, back, data, correctPercent, isCorrect })
        return read(toRead)
      })
      .then(() => {
        instance.current++
        console.log('current id: ', instance.current)
        if(instance.cards[instance.current]){
          instance.cards[instance.current].next()
        } else {
          let summary = util.summarize(instance.results, instance.endSession.bind(instance))
          console.log('summary is : ', summary)
          util.readSummary( summary ) 
          // instance.say('good job, that is all the cards I have for you. You score is')
        }
        return
      })
      .catch(err => console.log(err))

  }


  /**
   * 
   * @param {Array} expect a list of noris to map into cards
   * @param {*} a list of card class objects 
   */
  mapData (noriList){
    let cardsList = [];
    console.log('this: ', this)
    const chainFunctions = {
      read: this.read.bind(this),
      listen: this.listen.bind(this),
      socket: this.socket,
      instance: this
    }
    for( let i = 0; i < noriList.length; i++ ){
      let card = new Card(noriList[i])
      card.next = this.next.bind(card, chainFunctions)
      cardsList.push(card)
    };
    return cardsList;
  }
  
};

export default AI;