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

    var session = {
      audio: true,
      video: false
    };
    var recordRTC = null;
    navigator.getUserMedia(session, initializeRecorder, onError);

function initializeRecorder(stream) {
  var audioContext = window.AudioContext;
  var context = new audioContext();
  var audioInput = context.createMediaStreamSource(stream);
  var bufferSize = 2048;
  // create a javascript node
  var recorder = context.createJavaScriptNode(bufferSize, 1, 1);
  // specify the processing function
  recorder.onaudioprocess = recorderProcess;
  // connect stream to our recorder
  audioInput.connect(recorder);
  // connect our recorder to the previous destination
  recorder.connect(context.destination);
}


function convertFloat32ToInt16(buffer) {
  l = buffer.length;
  buf = new Int16Array(l);
  while (l--) {
    buf[l] = Math.min(1, buffer[l])*0x7FFF;
  }
  return buf.buffer;
}

function recorderProcess(e) {
  var left = e.inputBuffer.getChannelData(0);
  window.Stream.write(convertFloat32ToInt16(left));
}

var client = new BinaryClient('ws://localhost:9001');

client.on('open', function() {
  // for the sake of this example let's put the stream in the window
  console.log('weve opened a client')
  window.Stream = client.createStream();
}


    

  }

  render() {
    return (
      <div>Hello World from Voice!</div>
    )
  }
}

export default Voice;

