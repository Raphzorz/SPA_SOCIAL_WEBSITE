const Sequelize = require('sequelize');
const db = require('../config/database');


const Post = db.define('Post',{       // Creating a variable called Gig
    textBody: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.CHAR
    },
    image: {
        type: Sequelize.STRING
    },

});

module.exports = Post; // Exporting the variable Users

