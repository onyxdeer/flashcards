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