const get = (req, res) => {
  console.log('hello this is Edit get');
  res.send('hello again Edit get');
};

const post = (req, res) => {
  console.log('hello this is Edit post');
  res.send(req.body);
};


module.exports = { get, post };