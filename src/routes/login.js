const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken')


// const { TOKEN_SECRET } = process.env;
router.use(cookieParser())

router.use(bodyParser.json());
// 
// { token: 'd99e19848a23dda208f22773a2b1fff5aad8f39d' }

router.get('/', (req, res) => {
  console.log('cookies:', req.cookies)
  return res.status(200).send('HOME: req.user: ' + JSON.stringify(req.user))

  // let token
  // const jwtObj = {
  //   sub: {
  //     id: req.user.id
  //   },
  //   loggedIn: true
  // }
  // try {
  //   token = jwt.sign(jwtObj, TOKEN_SECRET, { expiresIn: '1d' })
  //   req.user.token = token
  // } catch (err) {
  //   res.status(500).send('Error setting token')
  // }
  // res.set('Auth', `Bearer: ${token}`).send('JWT')
});


function verifyLogin(req, res, next) {
  let username = req.body.username
  let password = req.body.password
  if (!username || !password) {
    res.status(401).send('No username or password entered')
  } else {
    next()
  }
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