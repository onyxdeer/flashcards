import React, { Component } from 'react';
import axios from 'axios';
import { commands, noris, responses } from './util.js';
import { connect } from 'react-redux';
import AI from './ai.js';
import displayActions from '../../actions/displayActions.js';

class Voice extends Component {
  constructor(props) {
    super(props);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.transfer = this.transfer.bind(this);
    this.endTransfer = this.endTransfer.bind(this);
    this.handleVisitCountIncrement = this.handleVisitCountIncrement.bind(this);
  }

  handleStart(){
    this.joe = new AI('joe', this.props.noris);    
    this.joe.startSession({})  //should check if annyang and responsive voice are enabled, retrieves data from the server
    this.props.fetchBentoMetaData(this.props.bentoId, this.handleVisitCountIncrement);
  }

  handleEnd(){
    if(this.joe){
      this.joe.endSession()
      window.responsiveVoice.cancel();
    }
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

  handleVisitCountIncrement () {
    console.log('triggering handleVisitcount increment')
    // this.props.incrementVisitCount(this.props.bentoId, this.props.visit_count);
  }

  render() {
    console.log('YO WE ARE RERENDERING')
    this.props.terminate ? this.handleEnd(): null;
    return (
      <div className="container animated bounceIn">
          <div className="buttonContainer">
            <button className="speechButton btn btn-default" onClick={this.handleStart}>Start</button>
            <button className="speechButton btn btn-default" onClick={this.handleEnd}>Stop</button>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bentoId: state.appReducer.bentoId,
    visit_count: state.displayReducer.visit_count,
    terminate: state.voiceReducer.terminate,
  }
}

export default connect(mapStateToProps, { ...displayActions })(Voice);



