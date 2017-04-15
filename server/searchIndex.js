const $search = require('./elasticSearch');
const Sequelize = require('sequelize');
const Promise = require('bluebird'); // Save to dependency

const Bento = require('../db/models/bentos.js');
const Image = require('../db/models/images.js');

function returnBento(id) {
  return Bento.findOne({where: {id: id}})
    .then((bento) => {
      const { id, name, id_hash, description, nori_count, private, visit_count, user_id, category_id } = bento;
      return {
        id,
        name,
        id_hash,
        description,
        nori_count,
        private,
        visit_count,
        user_id,
        category_id        
      }
    })
    .catch((err) => console.log(err));
};

function returnImage(id) {
  return Image.findOne({where: {id: id}})
    .then((image) => {
      const { id, url, nori_front, nori_back, bento_id, nori_id } = image;
      return {
        id,
        url,
        nori_front,
        nori_back,
        bento_id,
        nori_id
      }
    })
    .catch((err) => console.log(err));
};

// Update AWS ES bentos index
Bento.findAll()
  .then(bentos => {
    return Promise.all(bentos.map(bento => returnBento(bento.id)));
   })
  .then(bentosES => {
    console.log('BentosES: ', bentosES);
    return bentosES.map((bentoES, i) => {
      $search.index({
        index: 'bentos',
        type: 'Object',
        id: i,
        body: bentoES
      }, (error, response) => {});
    })
  })

// Update AWS ES thumbnails index
Image.findAll()
  .then(images => {
    return Promise.all(images.map(image => returnImage(image.id)));
  })
  .then(imagesES => {
    console.log('ImagesES: ', imagesES);
    return imagesES.map((imageES, i) => {
      $search.index({
        index: 'thumbnails',
        type: 'Object',
        id: i,
        body: imageES
      }, (error, response) => {});
    })
  })      