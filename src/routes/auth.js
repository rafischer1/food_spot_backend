require('dotenv').config()
const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')

// auth login ✔️
router.get('/login', (req, res) => {
  // res.render('login', { user: req.user });
  res.sendfile('./public/index.html');

});

// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// auth with github
// Use Passport with the github strategy that we attached to it in config
// This is where it redirects to github oauth
router.get('/github', passport.authenticate('github', {
  scope: ['profile']
}));

// callback route for github to redirect to
// hand control to passport to use code to grab profile info
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  // Probably a good place for JWT stuff
  let payLoad = {
    id: req.user.id,
    oauthid: req.user.oauthId,
    loggedIn: true,
  }
  let token = jwt.sign(payLoad, process.env.TOKEN_SECRET, {
    expiresIn: '8h'
  })
  res.cookie("token", token, {
    maxAge: 1728000 // 8 hours
  })
  res.redirect('https://food-seen.herokuapp.com')
});

module.exports = router;
