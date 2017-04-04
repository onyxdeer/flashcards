const Sequelize = require('sequelize');
const Image = require('../../../db/models/images.js');

const get = (req, res) => {
  Image.findOne({where: {url: 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg  '}})
    .then(function(image) {
      console.log('Successfully fetched image from database: ' + image.url);
      res.send(image);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  Image.create(req.body)
    .then(function(image) {
      console.log('Successfully saved image to database: ' + image.url);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "url": "https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
//   "bento_id": "1",
//   "nori_id": "1"
// }