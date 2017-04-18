const { app } = require('./server.js');
const util = require('./util/util.js');
const passport = require('passport');

const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

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

  app.route('/api/thumbnails')
    .get(util.tasks.thumbnails.get)
    .post(util.tasks.thumbnails.post);

  app.route('/api/popular')
    .get(util.tasks.popular.get);

  app.route('/api/search')
    .get(util.tasks.search.get);

  app.route('/api/search_thumbnails')
    .get(util.tasks.search_thumbnails.get);

  app.route('/api/sms')
    .post(util.tasks.sms.post);

  app.route('/api/login')
     /* GET login page. */
    .get((req, res) =>
      // Display the Login page with any flash message, if any
      res.render('login', { message: req.flash('message') }))
    /* Handle Login POST */
    .post(passport.authenticate('login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    }));

  app.route('/api/signup')
    /* GET Registration Page */
    .get((req, res) => {
      res.render('register', { message: req.flash('message') });
    })
    /* Handle Registration POST */
    .post(passport.authenticate('signup', {
      successRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: true,
    }));

    /* Handle Logout */
  app.route('/api/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/login');
    });

  /* GET Home Page */
  app.route('/api/home')
    .get(isAuthenticated, (req, res) => {
      res.render('/', { user: req.user });
    });

// As with any middleware it is quintessential to call next()
// if the user is authenticated

  app.route('/*')
    .get(util.tasks.redirect.get);
};

module.exports = bindRoutes;