const Sequelize = require('sequelize');
const crypto = require('crypto');
const Bento = require('../../../db/models/bentos.js');
const Nori = require('../../../db/models/noris.js');
const BentoNori = require('../../../db/models/bentosNoris.js');
const Image = require('../../../db/models/images.js');

const idToHash = (id) => {
  return crypto.createHash('md5').update(id.toString()).digest("hex").slice(0,9);
}

const get = (req, res) => {
  Bento.findAll({where: req.query})
    .then(function(bentos) {
      res.send(bentos);
    })
    .catch((err) => console.log(err));
};


//--------------------------------------------------------------------------------------------------------


const post = (req, res) => {      //Okay this is a bit disgusting but works                                      
  var data = req.body;                  //We are sending a post request to api/bento with a huge bento data
  var noris = data.noris;                //We separate the data to fit the schemas we  build
  var userId = data.user_id;
  var bentoId = data.bento_id;

  var bentoInfo = {                          //this is the bento columns
    id: bentoId,
    name: data.name,
    description: data.description,
    nori_count: noris.length,
    visit_count: data.visit_count,
    user_id: userId
  }

  var norisArray = noris.map(function(nori) {           //this is the noris columns
    var noriInfo = {
      text_front: nori.Front.text,
      text_back: nori.Back.text,
      audio_url_front: nori.Front.soundFile,
      audio_url_back: nori.Back.soundFile,
      image: nori.Front.image                                 //the image is saved in on the Front side always *for now*  this should be in order from 
    }
    return noriInfo;
  })
  
  var p1 = Bento.upsert(bentoInfo)                           //We either update or the insert the bento
  .then(function(created) {
    return created
  })
  var P1 = Promise.all([p1])                                 //we want to makesure p1 is done then decide what to do based on whether it was created or not
  .then(function(created){                                    // if it was created return the most recent bento created by using the userid
    if(created[0]) {
      return Bento.findOne({
        where: {
          user_id: userId,
        },  
          order: [ [ 'createdAt', 'DESC' ]],
      })
      .then(function(bento){
        bentoId = bento.dataValues.id;
        return Bento.update({
            id_hash: idToHash(bentoId)
          }, {
          where: {
            id: bentoId
          }
        });
      })
      .then(function(){
        Image.upsert({id: data.cover.id, bento_id: bentoId, nori_id: null, url: data.cover['url'], nori_front: null, nori_back: null}).then(function(test){
          if(test) {
            console.log("cover image has been saved", test)
          }
        })
      })
    }else {
      Image.upsert({id: data.cover.id, bento_id: bentoId, nori_id: null, url: data.cover['url'], nori_front: null, nori_back: null}).then(function(test){
        if(test) {
          console.log("cover image has been saved", test)
        }
      })
    } 
  })
  var clearImage_BentoLinks = Image.destroy({where: {bento_id: bentoId}}).then(function(number){   //destroys all the image urls saved that is related to the bento_id
    console.log(number)
  })
  var clearBento_NoriLinks = BentoNori.destroy({where: {bento_id: bentoId}}).then(function(number){
    console.log(number)                                                 //we then create a promise called clearBento_NoriLinks that wipes the joint table of any reference of that bento_id and the nori-ids associated with that
  })
  Promise.all([P1, clearBento_NoriLinks, clearImage_BentoLinks])                 //So once P1 and the above promise are done 
  .then(function(){
    var n1 = Promise.all(norisArray.map(function(noriInfo){        //we create the all the cards and if we find the same we DONT make a duplicate                                                            //n1 is the Promise.all so basically we make sure we do the above for all the cards
      return Nori.findOrCreate({where: {text_front: noriInfo.text_front, text_back: noriInfo.text_back, audio_url_front : noriInfo.audio_url_front, audio_url_back: noriInfo.audio_url_back}})
      .then(function(savedNori){
        var noriId = savedNori[0].dataValues.id;
        Image.findOrCreate({where: {bento_id: bentoId, nori_id: noriId, url: noriInfo.image, nori_front: true}})
        return savedNori
      })
    }))
    n1.then(function(nori){                                                               //nori represensts an array of the noris in the database, then we extract all those nori_ids 
      return nori.map(function(nori){
        return nori[0].dataValues.id
      })
    })
    .then(function(noriIds){
      Promise.all(noriIds.map(function(noriId){
        return BentoNori.findOrCreate({where: {bento_id: bentoId, nori_id: noriId}})
      }))
      .then(function(){
        return BentoNori.findAll({attributes: ['nori_id']})
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
