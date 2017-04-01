// const { app } = require('server')
const util = require('./util/util.js')

const bindRoutes = (app) => {
  app.route('/api/noris')
    .post(util.tasks.noris.post)
    .get(util.tasks.noris.get)

  app.route('/api/bentos')
    .post(util.tasks.bentos.post)
    .get(util.tasks.bentos.get)

  app.route('/hello')
    .get(function(req, res){
      res.send('okayy')
    })
}

module.exports = bindRoutes
