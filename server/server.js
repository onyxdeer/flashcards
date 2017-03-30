const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const db = require('../db/startdb.js');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, function() {
  console.log('flashcards: Express server connection established at:', PORT);
});