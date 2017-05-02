/**
 * Created by noamc on 8/31/14.
 */
var binaryServer = require('binaryjs').BinaryServer,
    https = require('https'),
    wav = require('wav'),
    opener = require('opener'),
    fs = require('fs'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    UAParser = require('./ua-parser'),
    CONFIG = require("../config.json"),
    lame = require('lame');
    // socket = require('./comm-server.js');

// const { socket } = require('../../server/server.js')
const { SOCKETSERVER_HOST } = require('../../config/config.js')
var socket = require('socket.io-client')(SOCKETSERVER_HOST);
socket.on('connect', function(){
    console.log('speech server connecting.. ')
    socket.on('chat message', function(data){
        console.log('is this real life ???')
    });

    socket.on('disconnect', function(){
    console.log('speech server disconnecting.. ')
    });
});

    socket.on('chat message', function(data){
        console.log('Received chat message broadcast')
    });

// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');
// Instantiates a client
const speech = Speech();
// The encoding of the audio file, e.g. 'LINEAR16'
const encoding = 'LINEAR16';
// The sample rate of the audio file, e.g. 16000
const sampleRate = 44100;

const request = {
  config: {
    encoding: encoding,
    sampleRate: sampleRate,
    // languageCode: 'en-US'
  },
//   interimResults: true
};

const sendDataBack = (data) => {

    //or write file to disc
    //then let them retrieve result later

    //broadcast end event
    //tell server to relay to other clients
    //check if data is empty
    // if data isn't empty then broadcast
    //other wise keep listening
    if(data){
        socket.emit('gSpeech complete', data)
        console.log('broadcasted: ', data)
    }
    console.log('\nwe are sending data back: ', data)
}


const createSpeechStream = () => speech.createRecognizeStream(request)
    .on('error', (err) => console.log('GOOGLE: ', err))
    .on('data', (data) => {
        console.log('GOOGLE: ', data)
        //   process.stdout.write(data.results)
      sendDataBack(data.results);
    });

// const recognizeStream = speech.createRecognizeStream(request)
//   .on('error', (err) => console.log('GOOGLE: ', err))
//   .on('data', (data) => {
//       console.log('GOOGLE: ', data)
//     //   process.stdout.write(data.results)
//       sendDataBack(data.results);
//     });




var uaParser = new UAParser();

if(!fs.existsSync("recordings")){
    fs.mkdirSync("recordings");  
}

var options = {
    key:    fs.readFileSync('ssl/server.key'),
    cert:   fs.readFileSync('ssl/server.crt'),
};

var app = connect();

app.use(serveStatic('public'));

var server = https.createServer(options,app);
// server.listen(9234);
if(CONFIG.ENV === 'PROD'){
    server.listen(9234);
} else {
    server.listen(9191)
}
// server.listen(9191);

// opener("https://localhost:9191");

var server = binaryServer({server:server});

server.on('connection', function(client) {
    console.log("new connection...");
    console.log('creating stream...')
    const googleStream = createSpeechStream()
    var fileWriter = null;
    var writeStream = null;
    
    var userAgent  =client._socket.upgradeReq.headers['user-agent'];
    uaParser.setUA(userAgent);
    var ua = uaParser.getResult();

    client.on('stream', function(stream, meta) {

        console.log("Stream Start@" + meta.sampleRate +"Hz");
        console.log('client identification is: ', meta.clientId)
        var fileName = "recordings/"+ ua.os.name +"-"+ ua.os.version +"_"+ new Date().getTime();
        
        switch(CONFIG.AudioEncoding){
            case "WAV":
                fileWriter = new wav.FileWriter(fileName + ".wav", {
                    channels: 1,
                    sampleRate: meta.sampleRate,
                    bitDepth: 16 });
                // stream.pipe(fileWriter).pipe(recognizeStream);
                // stream.pipe(recognizeStream);
                stream.pipe(googleStream);
            break;

            case "MP3":
                writeStream = fs.createWriteStream( fileName + ".mp3" );
                stream.pipe( new lame.Encoder(
                {
                    channels: 1, bitDepth: 16, sampleRate: 44100, bitRate: 128, outSampleRate: 22050, mode: lame.MONO
                })
                )
                .pipe( writeStream );
            break;
        };

    });
        
    client.on('close', function() {
        if ( fileWriter != null ) {
            fileWriter.end();
        } else if ( writeStream != null ) {
            writeStream.end();
        }
        console.log("Connection Closed");
    });
});