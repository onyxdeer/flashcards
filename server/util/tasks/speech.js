const record = require('node-record-lpcm16');
const Speech = require('@google-cloud/speech');

const speech = Speech();

// The encoding of the audio file, e.g. 'LINEAR16'
const encoding = 'LINEAR16';

// The sample rate of the audio file, e.g. 16000
const sampleRate = 16000;

const get = (req, res) => {
  console.log('Listening, press Ctrl+C to stop.');

  const request = {
    config: {
      encoding: encoding,
      sampleRate: sampleRate,
    },
  };

  console.log('request no problem');
  // Create a recognize stream
  const recognizeStream = speech.createRecognizeStream(request)
    .on('error', () => {
      console.log('we have an error in stream');
      console.error;
    })
    .on('data', data => process.stdout.write(data.results));

  // Start recording and send the microphone input to the Speech API
  record.start({
    sampleRate: sampleRate,
    threshold: 0,
  }).pipe(recognizeStream);
};

const post = (req, res) => {
  console.log('Listening, press Ctrl+C to stop.');
};

module.exports = { get, post };
