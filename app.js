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