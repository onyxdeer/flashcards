const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const database = require('../db/index.js');
const bindrouter = require('./router.js');
const util = require('./util/util.js');
const morgan = require('morgan');
var history = require('connect-history-api-fallback');
const Http = require('http')
const Sockets = require('socket.io')

const PORT = process.env.PORT || 8000;

const app = express();
var http = Http.createServer(app)
var io = Sockets(http)

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(morgan('combined'));
app.use(history());

bindrouter(app);

database();

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  

  // socket.on('chat message', function(data){
  //   console.log('\n\n\n\nour msg from socket in server: ', data)
  //   socket.broadcast.emit('chat message', 'okay smartypants you got it')
  // })

  socket.on('gSpeech complete', function(data){
    socket.broadcast.emit('transfer over', data)
  })
  // exports.socket = socket

});

http.listen(PORT, function() {
  console.log('Obento express server connection established at:', PORT);
});

exports.app = http;
// exports.socket = socket

// app.listen(PORT, function() {
//   console.log('Obento express server connection established at:', PORT);
// });

// exports.app = app;

