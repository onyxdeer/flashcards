const noris = require('./tasks/noris.js')
const speech = require('./tasks/speech.js')
const users = require('./tasks/users.js');
const bentos = require('./tasks/bentos.js');
const follows = require('./tasks/follows.js');
const categories = require('./tasks/categories.js');
const labels = require('./tasks/labels.js');
const tags = require('./tasks/tags.js');
const images = require('./tasks/images.js');
const bentos_noris = require('./tasks/bentos_noris.js');
const noris_tags = require('./tasks/noris_tags.js');
const redirect = require('./tasks/redirect.js');
const thumbnails = require('./tasks/thumbnails.js');
const popular = require('./tasks/popular.js');
const sms = require('./tasks/sms.js');

module.exports.tasks = {users, bentos, noris, follows, categories, labels, tags, images, bentos_noris, noris_tags, redirect, thumbnails, popular, sms};
