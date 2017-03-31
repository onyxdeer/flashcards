const get = (req, res) => {
  console.log('hello this is nori get')
  res.send('hello nori get')
}

const post = (req, res) => {
  console.log('hello this is nori post')
  res.send(req.body)
}


module.exports = { get, post }