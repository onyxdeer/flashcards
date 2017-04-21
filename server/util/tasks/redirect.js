const get = (req, res) => res.sendfile('index.html', { root: `${__dirname}/../../../public` });

module.exports = { get };
