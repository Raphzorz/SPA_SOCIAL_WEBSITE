const Sequelize = require('sequelize');
const db = require('../config/database');

const Comments = db.define('Comments',{       // Creating a variable called Gig
    commentBody: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.CHAR
    },
    postId: {
        type: Sequelize.INTEGER
    }
});

module.exports = Comments; // Exporting the variable Users