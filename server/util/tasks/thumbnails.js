const Sequelize = require('sequelize');
const Image = require('../../../db/models/images.js');

const get = (req, res) => {
  // console.log('req.query from thumbnails.get:', req.query);
  Image.findOne({where: req.query})
    .then(function(image) {
      if (!image) {
        console.log('No thumbnail was found from the database, defaulting to: \'img/no_image.jpg\'');
        res.send({ url: 'img/no_image.jpg'});
      } else {
        console.log('Successfully fetched thumbnail from database: ' + image.url);
        res.send(image);
      }
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