'use strict';

import util from './util.js';
import request from 'axios';
/*
  AI class responsible with the following functionalities:
  speech to text and speech recognition (via google API)
  text to speech (via responsiveVoice.js)
  and active command listening (via annyang.js)
*/
const AI = class {
  constructor(name) {
    this.name = name;
    this.commands = util.commands;
    this._initAnnyang(util.commands);
  }

  /*
   Inits annyang voice listener with the commands inside AI class
   @private
   @param {object} key: function names, value: functions to be executed with the names are 
      spoken
  */
  _initAnnyang(commands) {
    console.log(commands)
    if (window.annyang) {
      window.annyang.addCommands(commands);
      window.annyang.start();
      window.annyang.debug(true);
    };
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


  /*
    Retrieves all the methods in AI class
    removes all the non voice triggering methods
    @private
    @return {object} used to initialize annyang
  */
  _getCommands() {
    const commandNames = Object.getOwnPropertyNames( AI.prototype );
    let commandObj = {};
    let voiceCommands = this._removePrivateMethods(commandNames);
    voiceCommands.map(command => commandObj[command] = AI.prototype[command] );
    return commandObj;
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
    Command to voice text to speech using Responsive Voice
    @param {string} the string to transform to speech
    @return {AI instance}
  */
  say(text) {
    console.log('i am speaking: ', text)
    window.responsiveVoice.speak(text, "UK English Female");
    return this;
  }

  listen() {
    return new Promise( (resolve, reject) => {

    });
  }
  
};


// var a = new AI('joe')


export default AI;