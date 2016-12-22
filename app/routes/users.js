'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app,express) {
// User Routes
    var users = require('../../app/controllers/users');

// User Routes
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

// Setting up the users api
    app.post('/users', users.create);

// Setting the local strategy route
    // app.post('/users/session', passport.authenticate('local', {
    //     failureRedirect: '/signin',
    //     failureFlash: true
    // }), users.session);

    app.post('/users/session', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {

        switch (req.accepts('html', 'json')) {
          case 'html':
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              return res.redirect('/profile');
            });
            break;
          case 'json':
            if (err)  { return next(err); }
            if (!user) { return res.send({status: "error"}); }
            req.logIn(user, function(err) {
              if (err) { return res.send({status: "error"}); }
              return res.send({status: "success","user":user});
            });
            break;
          default:
            res.status(406).send();
        }
      })(req, res, next);    
    });


    // Setting social authentication routes

// Setting the facebook oauth route

    app.post('/auth/facebook/token', users.facebookUser);


    app.post('/auth/google', users.googleSocailUser);

    // Setting the twitter oauth route
    app.post('/auth/twitter', users.twitterSocialUser);

    // Finish with setting up the userId param
    app.param('userId', users.user);


};

