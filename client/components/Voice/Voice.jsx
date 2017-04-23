import React, { Component } from 'react';
import axios from 'axios';
import { commands, noris, responses } from './util.js';
import { connect } from 'react-redux';
import AI from './ai.js';


class Voice extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    // this.joe = new AI('joe')
    this.joe = new AI('joe', this.props.noris);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.transfer = this.transfer.bind(this);
    this.endTransfer = this.endTransfer.bind(this);
    
  }

  handleStart(){
    this.joe.startSession({})  //should check if annyang and responsive voice are enabled, retrieves data from the server
  }

  handleEnd(){
    this.joe.endSession()
  }

  transfer(){
    this.joe.startTransfer()
  }

  endTransfer(){
    this.joe.endTransfer()
  }

  calculateWidth(){
    let width = window.innerWidth
    return width + ''
  }


  render() {
    return (
      <div className="container">
          <div className="page-header">
            <h1><span className="glyphicon glyphicon-record"></span> Obento with sound</h1>
          </div>
          {/*<button className="start-rec-btn" onClick={this.handleStart}>Start</button>
          <button className="stop-rec-btn" onClick={this.handleEnd}>Stop Session</button>
          <button className="startTransfer" onClick={this.transfer}>Start Transfer</button>*/}
          <div className="buttonContainer">
            <button className="speechButton" onClick={this.handleStart}>Start</button>
            <button className="speechButton" onClick={this.handleEnd}>Stop</button>
          </div>
          {/*<button className="btn btn-primary" id="start-rec-btn" onClick={this.handleStart}>Start Session</button>
          <button className="btn btn-primary" id="stop-rec-btn" onClick={this.handleEnd}>Stop Session</button>*/}

          <div className="canvasContainer" id="canvas-container">
              <canvas className="canvasClass" width="600" height="300" id="canvas"></canvas>
          </div>
      </div>
    )
  }
}

export default connect((state) => ({
  noris: state.displayReducer.bentoData
}),{})(Voice);



