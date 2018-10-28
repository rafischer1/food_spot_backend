var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
var logger = require('morgan');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var postsRouter = require('./src/routes/posts');
var tagsRouter = require('./src/routes/tags');
var posts_tagsRouter = require('./src/routes/posts_tags');
var tags_postsRouter = require('./src/routes/tags_posts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/tags', tagsRouter);
app.use('/posts_tags', posts_tagsRouter);
app.use('/tags_posts', tags_postsRouter);

module.exports = app;