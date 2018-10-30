require('dotenv').config();
// Express
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
var cors = require('cors')
// Auth
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')

// Routers
const authRouter = require('./src/routes/auth')
const usersRouter = require('./src/routes/users')
const postsRouter = require('./src/routes/posts')
// const loginRouter = require('./src/routes/login')
const tagsRouter = require('./src/routes/tags')
const posts_tagsRouter = require('./src/routes/posts_tags')
const tags_postsRouter = require('./src/routes/tags_posts')

// Express
var app = express()

//cors headers
app.use(cors())

//use routers
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))



// app.use(express.urlencoded({
//   extended: false
// }))

// Routes
// app.use('/', indexRouter)
// app.use(cookieSession({
//     name: 'github stuff',
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: ['yghiujiobidsuhaonjfdjionjfiusdnjkfbnsdk']
// }));
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', authRouter)
// Middleware to initizilize passport & session

app.use('/users', usersRouter)
app.use('/posts', postsRouter)
// app.use('/login', loginRouter)
app.use('/tags', tagsRouter)
app.use('/posts_tags', posts_tagsRouter)
app.use('/tags_posts', tags_postsRouter)

module.exports = app

// const GitHubStrategy = require('passport-github').Strategy
// // Tells passport to use that github-specific data structure
// passport.use(new GitHubStrategy(
//   // GitHub strategy
//   {
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK,
//     userAgent: process.env.DOMAIN
//   },
//   // After both API calls were made
//   function onSuccessfulLogin(token, refreshToken, profile, done) {
//     // Got user from GitHub
//     // Check if user is in DB by GitHub id
//     const promise = usersModel.checkUser(profile._json.id)
//     promise.then((result) => {
//       // console.log('result in promise 45:', result)
//       if (result) {
//         // Log in if yes, create new user and login if new record
//         // !! Need work !!
//         // This happens once
//         let payLoad = {
//           id: profile._json.id,
//           loggedIn: true,
//         }
//         let token = jwt.sign(payLoad, process.env.TOKEN_SECRET, {
//           expiresIn: '1h'
//         })
//         // Add JWT to Cookie?
//         console.log(token)
//         let newUrl = `food-seen.surge.sh/#${token}`
//         app.get('https://food-seen.herokuapp.com/', (req, res) => {
//           console.log(res.body)
//           return app.redirect(newUrl)
//         })
//
//         // res.cookie({foodJWT: token})
//         // console.log(req.cookies)
//       } else {
//         // Create user
//         let newUser = {
//           name: profile._json.name,
//           location: profile._json.location,
//           avatar: profile._json.avatar_url,
//           oauthId: profile._json.id
//         }
//         usersModel.create(newUser)
//       }
//     })
//     // console.log('after serialize profile:', profile._json)
//     done(null, {
//       token,
//       profile
//     })
//   }
// ))

// Just redirects to github
// app.get('/auth/github', passport.authenticate('github'))

// Makes 2 api calls to github
// app.get('/auth/github/callback',
//   passport.authenticate('github', {
//     successRedirect: 'http://food-seen.surge.sh/',
//     failureRedirect: '/login'
//   }))


// // Take in whatever was passed into `done` inside the GitHubStrategy config
// passport.serializeUser((object, done) => {
//   // console.log("Serialize User", { token: object })
//   // When I call `done` _here_, I am passing in the data to be saved to the session
//   done(null, {
//     token: object.token
//   })
// })
//
// passport.deserializeUser((object, done) => {
//   // console.log("Deserialize User:", object)
//   done(null, object)
// })
