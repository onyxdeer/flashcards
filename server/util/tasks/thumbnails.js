const Sequelize = require('sequelize');
const Image = require('../../../db/models/images.js');

const get = (req, res) => {
  console.log('req.query from thumbnails.get:', req.query);
  Image.findAll({where: req.query})
    .then(function(thumbnails) {
      var imgArray = [];
      console.log('thumbnails in thumbnails.get:', thumbnails);
      res.send(thumbnails);
      // for (var i = 0; i < thumbnails.length; i++)
      //   if (thumbnails)
      //   console.log('No thumbnails were found from the database, defaulting to: \'img/no_image.jpg\'');

      //   res.send({ url: 'img/no_image.jpg'});
      // } else {
      //   console.log('Successfully fetched thumbnail from database: ' + image.url);
      //   res.send(image);
      // }
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