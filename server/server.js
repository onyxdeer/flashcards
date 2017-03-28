const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
// const db = require('../db/startdb.js');

const util = require('./util/util.js')

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));



app.listen(PORT, function() {
  console.log('flashcards: Express server connection established at:', PORT);
});


app.route('/api/cards')
  .post(util.tasks.cards.post)
  .get(util.tasks.cards.get)

app.route('/api/decks')
  .post(util.tasks.decks.post)
  .get(util.tasks.decks.get)