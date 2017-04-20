const db = require('./connect.js');
const createTables = require('./createtables.js');

// Initialize database
module.exports = () => db.authenticate()
  .then(() => console.log('Connection to database has been established successfully.'))
  .then(() => createTables())
  .then(console.log('Created tables successfully.'))
  .catch(err => console.log('Unable to connect to database:', err));
