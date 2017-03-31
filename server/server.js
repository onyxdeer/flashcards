const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const db = require('../db/startdb.js');
const router = require('./router.js')

const util = require('./util/util.js')


const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));


router(app)
// app.route('/hello')
//   .get(function(req, res){
//     res.send('okayy')
//   })


app.listen(PORT, function() {
  console.log('Obento express server connection established at:', PORT);
});

// exports.app = app 

// app.route('/api/noris')
//   .post(util.tasks.noris.post)
//   .get(util.tasks.noris.get)

// app.route('/api/bentos')
//   .post(util.tasks.bentos.post)
//   .get(util.tasks.bentos.get)