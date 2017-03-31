const { app } = require('server')

console.log('our app is : ', app)



app.route('/api/noris')
  .post(util.tasks.noris.post)
  .get(util.tasks.noris.get)

app.route('/api/bentos')
  .post(util.tasks.bentos.post)
  .get(util.tasks.bentos.get)