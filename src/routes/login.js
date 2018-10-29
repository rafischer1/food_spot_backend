const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const passport = require('passport')
const cookieSession = require('cookie-session')
const model = require('../models/users')

const jwt = require('jsonwebtoken')


// const { TOKEN_SECRET } = process.env;
router.use(cookieParser())
router.use(bodyParser.json());
router.use(passport.session());
// 

router.get('/', (req, res) => {
  console.log('I am in the login get route')
  passport.serializeUser((object, done) => {
    let rawDataObj = {}
    // let rawData = object.token._raw
    // rawData = rawData.substring(1, rawData.length - 1)
    console.log('rawData:', object.token._raw)
  })
});


function verifyLogin(req, res, next) {
  let authObj = {}
  passport.serializeUser((object, done) => {
    console.log("Serialize User", { token: object })
    authObj = {
      username: object.token.profile.username,
      id: object.token.profile.id
    }
    return authObj
  })
}

function checkIfUser(req, res, next) {
  // let username = req.body.username
  // users.getUser(username)
  //   .then(user => {
  //     if (!user) {
  //       res.status(403).send('No username found. Have you registered?')
  //     } else {
  //       req.user = user
  //       next()
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).send(`Server error`)
  //   })
}

function tryLogin(req, res, next) {
  let username = req.body.username
  let password = req.body.password

  users.tryLoginUser(username, password)
    .then(login => {
      if (!login) {
        res.status(403).send('Wrong password')
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).send(`Server error`)
    })
}


module.exports = router;