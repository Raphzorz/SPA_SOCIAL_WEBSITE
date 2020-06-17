const Sequelize = require('sequelize');
const db = require('../config/database');

const Users = db.define('Users',{       // Creating a variable called Gig
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    name: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    dateOfBirth: {
        type: Sequelize.DATE
    },
    email: {
        type: Sequelize.STRING,
        unique:true
    },
    passcode: {
        type: Sequelize.STRING
    },
    profilePicture: {
        type: Sequelize.STRING, defaultValue: '/uploaded-images/profile-images/blank-profile.png'
    }
});

module.exports = Users; // Exporting the variable Users