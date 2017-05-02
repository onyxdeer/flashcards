import React, { Component } from 'react';
import axios from 'axios';
import { commands, noris, responses } from './util.js';
import { connect } from 'react-redux';
import AI from './ai.js';
// import Modal from './Modal.jsx';


class Voice extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    console.log('VOICE NORIS: ', this.props.noris)
    // this.joe = new AI('joe')
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.transfer = this.transfer.bind(this);
    this.endTransfer = this.endTransfer.bind(this);
    // this.handleModal = this.handleModal.bind(this);
  }

  handleStart(){
    this.joe = new AI('joe', this.props.noris);    
    this.joe.startSession({})  //should check if annyang and responsive voice are enabled, retrieves data from the server
  }

  handleEnd(){
    this.joe.endSession()
    window.responsiveVoice.cancel();
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

  // handleModal(){
  //   console.log('triggering modal')
  // }


  render() {
    console.log('what is open right now: ', this.props.isOpen);
    // !this.props.isOpen ? this.handleEnd : null;
    console.log('what is TERMINATE RIGHT NOW?', this.props.terminate);
    this.props.terminate ? this.handleEnd(): null;
    return (
      <div className="container animated bounceIn">
         {/* <div className="create-title">
            <h1 className="default-font">Obento with Voice</h1>
          </div>  */ }     
          {/*<div className="page-header">
            <h1><span className="glyphicon glyphicon-record"></span> Obento with sound</h1>
          </div>*/}
          {/*<button className="start-rec-btn" onClick={this.handleStart}>Start</button>
          <button className="stop-rec-btn" onClick={this.handleEnd}>Stop Session</button>
          <button className="startTransfer" onClick={this.transfer}>Start Transfer</button>*/}
          <div className="buttonContainer">
            <button className="speechButton btn btn-success" onClick={this.handleStart}>Start</button>
            <button className="speechButton btn btn-success" onClick={this.handleEnd}>Stop</button>
  
          </div>





          {/*<button className="btn btn-primary" id="start-rec-btn" onClick={this.handleStart}>Start Session</button>
          <button className="btn btn-primary" id="stop-rec-btn" onClick={this.handleEnd}>Stop Session</button>*/}


      </div>
    )
  }
}

// export default Voice;

export default connect((state) => ({
  // noris: state.displayReducer.bentoData
  terminate: state.voiceReducer.terminate
}),{})(Voice);



