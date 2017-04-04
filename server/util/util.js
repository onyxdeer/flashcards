const noris = require('./tasks/noris.js')
const bentos = require('./tasks/bentos.js')
const speech = require('./tasks/speech.js')
const users = require('./tasks/users.js');

module.exports.tasks = {users, noris, speech, bentos};
