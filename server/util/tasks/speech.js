const fs = require('fs');

// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');

// Instantiates a client
const speech = Speech();

// The path to the local file on which to perform speech recognition, e.g. /path/to/audio.raw
// const filename = '/path/to/audio.raw';

// The encoding of the audio file, e.g. 'LINEAR16'
// const encoding = 'LINEAR16';

// The sample rate of the audio file, e.g. 16000
// const sampleRate = 16000;

const request = {
  config: {
    encoding: encoding,
    sampleRate: sampleRate
  }
};

// Stream the audio to the Google Cloud Speech API
const recognizeStream = speech.createRecognizeStream(request)
  .on('error', console.error)
  .on('data', (data) => {
    console.log('Data received: %j', data);
  });

// Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
fs.createReadStream(filename).pipe(recognizeStream);