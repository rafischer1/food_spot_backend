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
  // Scope Proctor -> tell us what we want, returned as an array
  scope: ['profile']
}));

// callback route for github to redirect to
// hand control to passport to use code to grab profile info
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  console.log('inredirect')
  // Probably a good place for JWT stuff
  // res.redirect('/profile/');
  let payLoad = {
    id: req.user.oauthId,
    loggedIn: true,
  }
  // console.log(process.env.TOKEN_SECRET,)
  let token = jwt.sign(payLoad, process.env.TOKEN_SECRET, {
    expiresIn: '1h'
  })
  // console.log(token)
  res.redirect(`http://food-seen.surge.sh/#${token}`)
});

module.exports = router;
