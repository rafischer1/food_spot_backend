var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
var logger = require('morgan')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const cookieSession = require('cookie-session')

//models
const usersModel = require('./src/models/users')

//routers
const indexRouter = require('./src/routes/index')
const usersRouter = require('./src/routes/users')
const postsRouter = require('./src/routes/posts')
const loginRouter = require('./src/routes/login')
const tagsRouter = require('./src/routes/tags')
const posts_tagsRouter = require('./src/routes/posts_tags')
const tags_postsRouter = require('./src/routes/tags_posts')

//express
var app = express()

//session
app.use(cookieSession({ secret: 'sdkfhk' }))

const GitHubStrategy = require('passport-github').Strategy
// Tells passport to use that github-specific data structure
passport.use(new GitHubStrategy(
  // filling in the blanks on the GitHub strategy
  {
    clientID: 'd5fc6e4b03b45fc8c875',
    clientSecret: '42e0b68cf795ae0ef2a25dce0cefd1c6b0e36cf3',
    callbackURL: 'http://localhost:3000/auth/github/callback',
    userAgent: 'lunch-demo.example.com'
  },
  // after both API calls were made
  function onSuccessfulLogin(token, refreshToken, profile, done) {

    // got user from GitHub
    // profile._json
    // console.log(profile._json)
    const promise = usersModel.checkUser(profile._json.id)
    promise.then((result) => {
      console.log('result in promise 45:', result)
    })
    // console.log('true or false? line 44:', promise)
    // check to see if they exist
    // log in if yes, create new user and login if new record
    // This happens once
    // console.log('after serialize profile:', profile._json)
    done(null, { token, profile })
  }
))

app.use(passport.initialize())
app.use(passport.session())

// take in whatever was passed into `done` inside the GitHubStrategy config
passport.serializeUser((object, done) => {
  // console.log("Serialize User", { token: object })
  // when I call `done` _here_, I am passing in the data to be saved to the session
  done(null, { token: object.token })
})

passport.deserializeUser((object, done) => {
  // console.log("Deserialize User:", object)
  done(null, object)
})

// Just redirects to github
app.get('/auth/github', passport.authenticate('github'))

// makes 2 api calls to github
app.get('/auth/github/callback',
  passport.authenticate('github', { successRedirect: '/index.html', failureRedirect: '/login' }))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/login', loginRouter)
app.use('/tags', tagsRouter)
app.use('/posts_tags', posts_tagsRouter)
app.use('/tags_posts', tags_postsRouter)

module.exports = app
