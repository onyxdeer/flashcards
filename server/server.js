const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const db = require('../db/startdb.js');

const util = require('./util/util.js')

const PORT = process.env.PORT || 8000;

const app = express();
exports.app = app 

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));



app.listen(PORT, function() {
  console.log('Obento express server connection established at:', PORT);
});


// app.route('/api/noris')
//   .post(util.tasks.noris.post)
//   .get(util.tasks.noris.get)

// app.route('/api/bentos')
//   .post(util.tasks.bentos.post)
//   .get(util.tasks.bentos.get)