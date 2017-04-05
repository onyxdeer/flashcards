import React, { Component } from 'react';
import axios from 'axios';
import { commands, noris, responses } from './util.js';

class Voice extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    if (annyang) {
      annyang.addCommands(commands);
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

