import React, { Component } from 'react';
import axios from 'axios';
import { commands, noris, responses } from './util.js';
import AI from './ai.js';

class Voice extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.joe = new AI('joe')
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }

  handleStart(){
    
    // joe.listen()    
    this.joe.startSession({})  //should check if annyang and responsive voice are enabled, retrieves data from the server
    // setTimeout(function(){
    //   joe.startSession({}) 

    // }, 300);
    // joe.startReading()           //takes the first nori, reads the front message.               
    
  }

  handleEnd(){
    this.joe.endSession()
  }

  render() {
    return (
      <div className="container">
          <div className="page-header">
            <h1><span className="glyphicon glyphicon-record"></span> Obento with sound</h1>
          </div>

          <button className="btn btn-primary" id="start-rec-btn" onClick={this.handleStart}>Start Session</button>
          <button className="btn btn-primary" id="stop-rec-btn" onClick={this.handleEnd}>Stop Session</button>

          <div id="canvas-container">
              <canvas width="600" height="100" id="canvas"></canvas>
          </div>
      </div>
    )
  }
}

export default Voice;



