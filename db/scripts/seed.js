const crypto = require('crypto');
const User = require('../models/users.js');

// Seed database with mock data

// User
User.create({
  username: 'saungchi',
  password: 'saungchipassword',
})
.catch(err => console.log('Error seeding database: ', err));
