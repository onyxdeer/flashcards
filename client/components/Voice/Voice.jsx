import React, { Component } from 'react';
import axios from 'axios';

class Voice extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'start': function() {
        // $('#tpsreport').animate({bottom: '-100px'});
        console.log('hello')
      },
      'hello': function(){
        console.log('just work baby')
      },
      'next': function(){
        console.log('next function called!')
      },
      'go' : function(){
        console.log('go fucntion called')
      },
      'repeat': function(){
        console.log('repeat function called')
      },
      'redo': function(){
        console.log('redo fucntion called')
      },
      'previous': function(){
        console.log('previous function called')
      },
      'retry': function(){
        console.log('retry function called')
      }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }

  }

  render() {
    return (
      <div>Hello World from Voice!</div>
    )
  }
}

export default Voice;