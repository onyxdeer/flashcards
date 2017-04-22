const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');
const passport = require('passport');
const flash = require('connect-flash');
const database = require('../db/setup.js');
const bindrouter = require('./router.js');
const { SESSION_SECRET } = require('../config/config.js');

const PORT = process.env.PORT || 8000;

const app = express();

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

app.listen(PORT, () => console.log('Obento express server connection established at:', PORT));

exports.app = app;

