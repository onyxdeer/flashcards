// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');

// Instantiates a client
const speech = Speech();

// The path to the local file on which to perform speech recognition, e.g. /path/to/audio.raw
const filename = 'sample.wav';

// The encoding of the audio file, e.g. 'LINEAR16'
const encoding = 'LINEAR16';

// The sample rate of the audio file, e.g. 16000, 44100
const sampleRate = 44100;

const request = {
  encoding: encoding,
  sampleRate: sampleRate
};

// Detects speech in the audio file. This creates a recognition job that you
// can wait for now, or get its result later.
speech.startRecognition(filename, request)
  .then((results) => {
    const operation = results[0];
    // Get a Promise represention of the final result of the job
    return operation.promise();
  })
  .then((transcription) => {
    console.log(`Transcription: ${transcription}`);
  });