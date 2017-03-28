


const get = (req, res) => {
  console.log('hello this is Cardsget')
  res.send('hello cards get')
}

const post = (req, res) => {
  console.log('hello this is Cardspost')
  res.send(req.body)
}


module.exports = { get, post }