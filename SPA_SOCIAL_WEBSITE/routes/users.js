const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const db = require('../config/database');
const Users = require('../models/Users');
const Post = require('../models/Post');
const Op = Sequelize.Op;
const sanitizeHtml = require('sanitize-html');
const multer = require("multer");
const path = require('path'); // Path module which is core module to deal with file paths
const fs = require("fs");
const bcrypt = require('bcrypt-nodejs');
const upload = multer({
    dest: path.join(__dirname, "../temporary")
});

// Declaring the session variable
var sess;

// Runs when the page opens. Called from client.js
router.post('/check-login',function(req,res){
    sess = req.session;
    // If session contains the user email then it will send logged as a response to client.js
    if(sess.email) {
        console.log("Session exists");
        res.send("logged")
    }
    // If session does not contain the user email then it will send "not logged in" as a response to the client
    else {
        res.send("Not logged in");
        console.log("Not logged in");
    }
});


// From login
router.post('/login',  (request,response,err) => {

    const emailLoginSanitized = sanitizeHtml(request.body.emailLogin);
    const passcodeSanitized = sanitizeHtml(request.body.passcodeLogin);

    sess = request.session;
    if (sess.email) {   // If there is a session in progress then destroy that session
        request.session.destroy();
        response.send("ok");
    } else {
        Users.findOne({
            where: {
                email: emailLoginSanitized,
            }
        })
    .then(loggedUser => {
        if (loggedUser !=null){
        bcrypt.compare(passcodeSanitized, loggedUser.passcode, function (err, result) {
                if (result === true) {
                    sess.email = emailLoginSanitized;
                    sess.userId = loggedUser.id;
                    console.log("Logged in");
                    response.send('ok');
                } else {
                    response.send("not ok")
                }
            }
        )}
    else {
        response.send("not ok")
        }
    })
    }
});

// Get user details
router.post('/get-details',function(req,res){
    sess = req.session;
    // If session contains the user email then it will send logged as a response to client.js
    if(sess.email) {
        Users.findAll({
            attributes: ['name', 'lastname','dateOfBirth','profilePicture','createdAt'],
            where: {
                email: sess.email
            }
        })
            .then(user =>res.send(JSON.stringify(user)))
            .catch(err=>console.log(err))
    }
    // If session does not contain the user email then it will send "not logged in" as a response to the client
    else {
        res.send("Not logged in");
        console.log("Not logged in");
    }
});

// Registration

router.post('/register',(request,response) => {

        const passcodeSanitized = sanitizeHtml(request.body.passcode);
        const emailSanitized = sanitizeHtml(request.body.email);
        const dateOfBirthSanitized = sanitizeHtml(request.body.dateOfBirth);
        const lastnameSanitized = sanitizeHtml(request.body.lastname);
        const nameSanitized = sanitizeHtml(request.body.name);

        bcrypt.hash(passcodeSanitized, null, null, function(err, hash) {

    Users.findOne({
        attributes: ['email'],
        where: {
            email: emailSanitized
        },
        raw:true
    })
        .then(user => {if (user !== null){
    response.send("fail");
    }
    else {
        Users.create({          // If the column name I am inserting into is the same then I do not need to do it like this I can simply write name. Writing like this so I understand better when looking at code later
            name: nameSanitized,
            lastname: lastnameSanitized,
            dateOfBirth: dateOfBirthSanitized,
            passcode: hash,
            email: emailSanitized
        })
            .then(response.send("registered"))
            .catch(err => console.log(err))
        }}
    )})}
    );

// Uploading a profile image

router.post(
    "/upload-profile-image",
    upload.single('profile-upload' /* name attribute of <file> element in the form */),
    (req, res) => {
        sess = req.session;
        console.log(req.body);
        const tempPath = req.file.path;
        const pathAddition = "../public/uploaded-images/profile-images/img" + "-" + sess.userId;
        const targetPath = path.join(__dirname, pathAddition);

        if (path.extname(req.file.originalname).toLowerCase() === ".png" || ".jpeg" || ".jpg" || ".gif" ) {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
                res
                    .status(200);
                let updatedPathAddition = pathAddition.replace("../public", "");
                Users.find({ where: { id: sess.userId } })
                    .then    (function (loggedUser) {
                        // Check if record exists in db
                        if (loggedUser) {
                            loggedUser.update({
                                profilePicture: updatedPathAddition
                            })
                        }
                    }).then(  res.send(updatedPathAddition));
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);
                res
                    .status(403)
                    .contentType("text/plain")
                    .end("Only .png, .jpeg or .gif files are allowed!");
            });
        }
    }
);

// Error for failing image upload
const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

module.exports=router;