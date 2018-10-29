require('dotenv').config();
// Express
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
var cors = require('cors')
// Auth
const passport = require('passport')
const jwt = require('jsonwebtoken')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
// Models
const usersModel = require('./src/models/users')
// Routers
// const indexRouter = require('./src/routes/index')
const usersRouter = require('./src/routes/users')
const postsRouter = require('./src/routes/posts')
const loginRouter = require('./src/routes/login')
const tagsRouter = require('./src/routes/tags')
const posts_tagsRouter = require('./src/routes/posts_tags')
const tags_postsRouter = require('./src/routes/tags_posts')

// Express
var app = express()

// Session
app.use(cookieSession({
  secret: process.env.COOKIE_SECRET
}))

const GitHubStrategy = require('passport-github').Strategy
// Tells passport to use that github-specific data structure
passport.use(new GitHubStrategy(
  // GitHub strategy
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK,
    userAgent: process.env.DOMAIN
  },
  // After both API calls were made
  function onSuccessfulLogin(token, refreshToken, profile, done) {
    // Got user from GitHub
    // Check if user is in DB by GitHub id
    const promise = usersModel.checkUser(profile._json.id)
    promise.then((result) => {
      // console.log('result in promise 45:', result)
      if (result) {
        // Log in if yes, create new user and login if new record
        // !! Need work !!
        // This happens once
      } else {
        // Create user
        let newUser = {
          name: profile._json.name,
          location: profile._json.location,
          avatar: profile._json.avatar_url,
          oauthId: profile._json.id
        }
        usersModel.create(newUser)
      }
    })
    // console.log('after serialize profile:', profile._json)
    done(null, {
      token,
      profile
    })
  }
))

app.use(passport.initialize())
app.use(passport.session())

// Take in whatever was passed into `done` inside the GitHubStrategy config
passport.serializeUser((object, done) => {
  // console.log("Serialize User", { token: object })
  // When I call `done` _here_, I am passing in the data to be saved to the session
  done(null, {
    token: object.token
  })
})

passport.deserializeUser((object, done) => {
  // console.log("Deserialize User:", object)
  done(null, object)
})

//cors headers
app.use(cors())


//use routers
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

// Just redirects to github
app.get('/auth/github', passport.authenticate('github'))

// Makes 2 api calls to github
app.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: 'sfldjflkafjsurge.sh/index.html',
    failureRedirect: '/login'
  }))


// app.use(express.urlencoded({
//   extended: false
// }))

// Routes
// app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/login', loginRouter)
app.use('/tags', tagsRouter)
app.use('/posts_tags', posts_tagsRouter)
app.use('/tags_posts', tags_postsRouter)

module.exports = app