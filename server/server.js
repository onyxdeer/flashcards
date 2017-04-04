const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const database = require('../db/index.js');
const bindrouter = require('./router.js');
const util = require('./util/util.js');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(morgan('combined'));

bindrouter(app);

database();

app.listen(PORT, function() {
  console.log('Obento express server connection established at:', PORT);
});

exports.app = app;

