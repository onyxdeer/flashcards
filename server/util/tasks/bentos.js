const Sequelize = require('sequelize');
const Bento = require('../../../db/models/bentos.js');
const Nori = require('../../../db/models/noris.js');
const Bento_nori = require('../../../db/models/bentos_noris.js');


const get = (req, res) => {
  console.log('req.query for /bentos/get:', req.query);
  Bento.findAll({where: req.query})
    .then(function(bentos) {
      // console.log('bento:', bento);
      res.send(bentos);
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
      text_front: nori.Front.text,
      text_back: nori.Back.text,
      audio_url_front: nori.Front.soundFile,
      audio_url_back: nori.Back.soundFile
    }
    return noriInfo;
  })
  
  var p1 = Bento.upsert(bentoInfo)
  .then(function(created) {
    return created
  })
  var P1 = Promise.all([p1])
  .then(function(created){
    if(created[0]) {
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
  var clearBento_NoriLinks = Bento_nori.destroy({where: {bento_id: bentoId}}).then(function(number){
    console.log(number)
  })
  Promise.all([P1, clearBento_NoriLinks])
  .then(function(){
    var n1 = Promise.all(norisArray.map(function(noriInfo){
      console.log(noriInfo)
      return Nori.findOrCreate({where: {text_front: noriInfo.text_front, text_back: noriInfo.text_back, audio_url_front : noriInfo.audio_url_front, audio_url_back: noriInfo.audio_url_back}})
    }))
    n1.then(function(nori){
      return nori.map(function(nori, index){
        return nori[0].dataValues.id
      })
    })
    .then(function(noriIds){
      Promise.all(noriIds.map(function(noriId){
        return Bento_nori.findOrCreate({where: {bento_id: bentoId, nori_id: noriId}})
      }))
      .then(function(){
       return Bento_nori.findAll({attributes: ['nori_id']})
      })
      .then(function(result){
        var idArray = result.map(function(id){
          return id.dataValues.nori_id
        })
        Nori.destroy({where: {id: {$notIn: idArray}}})
      })
      .then(function(){ 
        res.send(200, bentoId)
      })
    })
  })
      .catch((err) => console.log("UNABLE TO SAVE TO DATABASE", err));    
};

module.exports = {get, post};
