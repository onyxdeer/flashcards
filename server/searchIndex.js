const $search = require('./elasticSearch');
const Sequelize = require('sequelize');
const Promise = require('bluebird'); // Save to dependency

const Bento = require('../db/models/bentos.js');

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

Bento.findAll()
  .then(bentos => {
    console.log(bentos.data);
    return Promise.all(bentos.data.map(bento => returnBento(bento.id)));
   })
  .then(bentosES => {
    bentosES.map((bentoES, i) => {
      $search.index({
        index: 'bentos',
        type: 'Object',
        id: i,
        body: bentoES
      }, (error, response) => {});
    })
  })