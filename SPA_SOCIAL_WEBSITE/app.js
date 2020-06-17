const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path'); // Path module which is core module to deal with file paths
const Users = require('./models/Users');
const Post = require('./models/Post');
const Comments = require('./models/Comments');
const uuidv4 = require('uuid/v4');
const multer = require("multer");
const fs = require("fs");
const expressSanitizer = require('express-sanitizer');
// Database
const db = require('./config/database'); // Setting db as the exported module


// Middleware needed for file uploads
const upload = multer({
    dest: path.join(__dirname, "./temporary")
});

// Uploading a profile image

// Testing the database
db.authenticate()
.then(() => console.log('Database connected...yay :)'))
.catch(err => console.log('Error: ' + err));

const app = express(); // Initialise the app
//Body parser
app.use(bodyParser.urlencoded({extended:false})); // To get info from form

app.use(session({
    secret: 'never guess this',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// One to many relationships
Users.hasMany(Post, {foreignKey: 'userId'});
Post.belongsTo(Users, {foreignKey: 'userId'});
Post.hasMany(Comments,{foreignKey: 'postId'});
Comments.belongsTo(Post, {foreignKey: 'postId'});
Users.hasMany(Comments,{foreignKey : 'userId'});
Comments.belongsTo(Users,{foreignKey : 'userId'});

// Declaring the session variable
var sess;

app.use(express.static('public')); // Use static files from here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use('/users',require('./routes/users')); // For all functions that pertain to users (Have /users in it) they will be redirected to that file
app.use('/posts',require('./routes/posts'));

const PORT = process.env.PORT || 5000; // 5000 on local machine

app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = express();