const Promise = require('bluebird');
const $search = require('./elasticSearch');
const Bento = require('../../../db/models/bentos.js');
// const Image = require('../../../db/models/images.js');

// // Update AWS ES bentos index
function fetchBento(id) {
  return Bento.findOne({ where: { id } })
    .then((bento) => {
      const { name, id_hash, description, nori_count, visit_count, user_id, category_id } = bento;
      return {
        id,
        name,
        id_hash,
        description,
        nori_count,
        visit_count,
        user_id,
        category_id,
      };
    })
    .catch(err => console.log(err));
}

Bento.findAll()
  .then(bentos => Promise.all(bentos.map(bento => fetchBento(bento.id))))
  .then(bentosES => bentosES.map((bentoES, i) => $search.index({
    index: 'bentos',
    type: 'Object',
    id: i,
    body: bentoES,
  })));

// Update AWS ES thumbnails index
// function fetchImage(id) {
//   return Image.findOne({ where: { id } })
//     .then((image) => {
//       const { url, nori_front, nori_back, bento_id, nori_id } = image;
//       return {
//         id,
//         url,
//         nori_front,
//         nori_back,
//         bento_id,
//         nori_id,
//       };
//     })
//     .catch(err => console.log(err));
// }

// Image.findAll()
//   .then(images => Promise.all(images.map(image => fetchImage(image.id))))
//   .then(imagesES => imagesES.map((imageES, i) => $search.index({
//     index: 'thumbnails',
//     type: 'Object',
//     id: i,
//     body: imageES,
//   })));

// Delete 'bentos' index
// $search.indices.delete({
//   index: 'bentos',
// });

// Delete 'thumbnails' index
// $search.indices.delete({
//   index: 'thumbnails',
// });
