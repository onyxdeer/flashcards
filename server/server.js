const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
<<<<<<< HEAD
var history = require('connect-history-api-fallback');
const Http = require('http')
const Sockets = require('socket.io')
=======
const history = require('connect-history-api-fallback');
const passport = require('passport');
const flash = require('connect-flash');
const database = require('../db/setup.js');
const bindrouter = require('./router.js');
const { SESSION_SECRET } = require('../config/config.js');
>>>>>>> feature-main-bugfix

const PORT = process.env.PORT || 8000;

const app = express();
var http = Http.createServer(app)
var io = Sockets(http)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('combined'));
app.use(history());

app.use(session({ secret: SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

bindrouter(app);

database();

<<<<<<< HEAD
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
=======
app.listen(PORT, () => console.log('Obento express server connection established at:', PORT));
>>>>>>> feature-main-bugfix

exports.app = http;
// exports.socket = socket

// app.listen(PORT, function() {
//   console.log('Obento express server connection established at:', PORT);
// });

// exports.app = app;

