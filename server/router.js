const { app } = require('server')

console.log('our app is : ', app)



app.route('/api/cards')
  .post(util.tasks.cards.post)
  .get(util.tasks.cards.get)

app.route('/api/decks')
  .post(util.tasks.decks.post)
  .get(util.tasks.decks.get)