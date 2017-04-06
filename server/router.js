const {app} = require('./server.js');
const util = require('./util/util.js');

const bindRoutes = (app) => {
  app.route('/api/users')
    .get(util.tasks.users.get)
    .post(util.tasks.users.post);

  app.route('/api/bentos')
    .get(util.tasks.bentos.get)  
    .post(util.tasks.bentos.post);

  app.route('/api/noris')
    .get(util.tasks.noris.get)  
    .post(util.tasks.noris.post);

  app.route('/api/follows')
    .get(util.tasks.follows.get)  
    .post(util.tasks.follows.post);

  app.route('/api/categories')
    .get(util.tasks.categories.get)
    .post(util.tasks.categories.post);

  app.route('/api/labels')
    .get(util.tasks.labels.get)  
    .post(util.tasks.labels.post);

  app.route('/api/tags')
    .get(util.tasks.tags.get)  
    .post(util.tasks.tags.post);

  app.route('/api/images')
    .get(util.tasks.images.get)  
    .post(util.tasks.images.post);

  app.route('/api/bentos_noris')
    .get(util.tasks.bentos_noris.get)  
    .post(util.tasks.bentos_noris.post);

  app.route('/api/noris_tags')
    .get(util.tasks.noris_tags.get)  
    .post(util.tasks.noris_tags.post);     

  app.route('/*')
    .get(util.tasks.redirect.get);   
};

module.exports = bindRoutes;