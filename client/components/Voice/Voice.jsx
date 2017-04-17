import React, { Component } from 'react';
import axios from 'axios';
import { commands, noris, responses } from './util.js';
import AI from './ai.js';

class Voice extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }


    var joe = new AI('joe')
    joe.listen()
    // joe.startSesssion()  //should check if annyang and responsive voice are enabled, retrieves data from the server
    // joe.startReading()           //takes the first nori, reads the front message.               
    

  }

  render() {
    return (
      <div class="container">
          <div class="page-header">
            <h1><span class="glyphicon glyphicon-record"></span> Obento with sound</h1>
          </div>

          <button class="btn btn-primary" id="start-rec-btn">Start Recording</button>
          <button class="btn btn-primary" id="stop-rec-btn">Stop Recording</button>

          <div id="canvas-container">
              <canvas width="600" height="100" id="canvas"></canvas>
          </div>
      </div>
    )
  }
}

export default Voice;



