const Sequelize = require('sequelize');
const Bento = require('../../../db/models/bentos.js');
const Nori = require('../../../db/models/noris.js');
const Bento_nori = require('../../../db/models/bentos_noris.js');


const get = (req, res) => {
  console.log('req.query:', req.query);
  Bento.findAll({where: req.query})
    .then(function(bento) {
      console.log('Successfully fetched bento from database: ' + bento.name);
      res.send(bento);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  console.log(req.body);
  var data = req.body;
  var noris = data.noris;
  var userId = data.user_id;
  var bentoId = data.bento_id;
  var bentoInfo = { 
    id: bentoId,
    name: data.name,
    description: data.description,
    nori_count: noris.length,
    visit_count: data.visit_count,
    user_id: userId
  }
  var norisArray = noris.map(function(nori) {
    var noriInfo = {
      id: nori.id,
      text_front: nori.Front.text,
      text_back: nori.Back.text,
      audio_url_front: nori.Front.soundFile,
      audio_url_back: nori.Back.soundFile
    }
    return noriInfo;
  })
  
  var p1 = 
  Bento.upsert(bentoInfo)
  .then(function(created) {
    console.log(created);
    return created
  })
  var P1 = Promise.all([p1])
  .then(function(created){
    if(created) {
      return Bento.findOne({
        where: {
          user_id: userId,
        },  
          order: [ [ 'createdAt', 'DESC' ]],
      })
      .then(function(bento){
        console.log("Here is your bento that was just created", bento.dataValues.id)
        bentoId = bento.dataValues.id
      })
    } 
  })
  Promise.all([P1])
  .then(function(){
    
    res.send(200, bentoId)
  })

    //     .then(function(){
    //       norisArray.forEach(function(noriInfo){
    //       Nori.upsert(noriInfo)
    //       .then(function(created){
    //         console.log("Nori has been eiterh",created)
    //       })
    //     })
    //   }
    // .then(function(){
    //   console.log("Successfully saved all noris into database")
    //   res.send(200)
    // })
      .catch((err) => console.log("UNABLE TO SAVE TO DATABASE", err));    
};

module.exports = {get, post};
