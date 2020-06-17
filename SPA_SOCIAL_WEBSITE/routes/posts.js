const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');
const Comments = require('../models/Comments');
const Op = Sequelize.Op;
const multer = require("multer");
const path = require('path'); // Path module which is core module to deal with file paths
const sanitizeHtml = require('sanitize-html');
const fs = require("fs");
const upload = multer({
    dest: path.join(__dirname, "../temporary")
});
// Declaring the session variable
var sess;

// Create post
router.post('/post-to-news-feed',(request,response) => {
    const imageSanitized = sanitizeHtml(request.body.image);
    const textBodySanitized = sanitizeHtml(request.body.textBody);
    sess = request.session;

    Users.findOne({
        attributes: ['Id'],
        where: {
            email: sess.email
        },
        raw:true
    })
        .then(function (userId) {

            Post.create(
                {          // If the column name I am inserting into is the same then I do not need to do it like this I can simply write name. Writing like this so I understand better when looking at code later
                    textBody: textBodySanitized,
                    userId : userId.Id,
                    image : imageSanitized
                })
                .then(response.send("posted"))
                .catch(err=>console.log(err))}
        )}
);

router.post(
    "/upload",
    upload.single("image-upload" /* name attribute of <file> element in the form */),
    (req, res) => {
        const tempPath = req.file.path;
        const pathAddition = "../public/uploaded-images/img" + "-" + Date.now();
        const targetPath = path.join(__dirname, pathAddition);

        if (path.extname(req.file.originalname).toLowerCase() === ".png" || ".jpeg" || ".jpg" || ".gif" ) {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(200);
                let updatedPathAddition = pathAddition.replace("../public", "");
                console.log(updatedPathAddition);
                res.send(updatedPathAddition);
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


// Runs when the page opens. Called from client.js
router.post('/create-comment',function(req,res){
    sess = req.session;
    const commentTextBodySanitized = sanitizeHtml(req.body.commentTextBody);
    const postIdSanitized = sanitizeHtml(req.body.postId);
    sess = req.session;
    Users.findOne({
        attributes: ['Id'],
        where: {
            email: sess.email
        },
        raw:true
    })
        .then(function (userId) {

            Comments.create(
                {          // If the column name I am inserting into is the same then I do not need to do it like this I can simply write name. Writing like this so I understand better when looking at code later
                    commentBody: commentTextBodySanitized,
                    userId : userId.Id,
                    postId : postIdSanitized
                })
                .then(res.send("Successfully posted comment"))
                .catch(err=>console.log(err))}
        )}
);


router.post('/get-comment-details',function(req,res){

    sess = req.session;
    if(sess.email) {
        Comments.findAll({
            include: [{
                model: Users, Post,
                required: true,
                attributes: ['name']['profilePicture'],
            }],
            order : [['createdAt', 'Asc']],

            // where: {
            //     Id: '1'
            // },
            raw:true
        }).then(comment =>res.send(JSON.stringify(comment)))
            .catch(err=>console.log(err))
    }
    // If session does not contain the user email then it will send "not logged in" as a response to the client
    else {
        res.send("Not logged in");
        console.log("Not logged in");
    }
});




router.post('/get-post-details',function(req,res) {
    sess = req.session;
    // If session contains the user email then it will send logged as a response to client.js
    if (sess.email) {
        Post.findAll({
            include: [{
                model: Users,
                required: true,
                attributes: ['name']['lastname'],
            }],
            order: [['createdAt', 'Desc']], // So that newest posts appear first
            raw: true
        }).then(post => res.send(JSON.stringify(post)))
            .catch(err => console.log(err))
    }
    // If session does not contain the user email then it will send "not logged in" as a response to the client
    else {
        res.send("Not logged in");
        console.log("Not logged in");
    }
});

router.post('/search',function(req,res){
    const searchSanitized = sanitizeHtml(req.body.search);
    sess = req.session;
    // If session contains the user email then it will send logged as a response to client.js
    if(sess.email) {
        Post.findAll({
            where: {
                [Op.or]: [
                    {
                        'textBody': {
                            [Op.like]: '%'+searchSanitized+'%'
                        }
                    },
                    {
                        name: Sequelize.where(Sequelize.col('User.name'), {
                            [Op.like]: '%'+searchSanitized+'%'
                        })
                    }
                ]
            },
            include: [{
                model: Users,
                required: true,
                attributes: ['name']['lastname']},
            ],
            order : [['createdAt', 'Desc']], // So that newest posts appear first
            raw:true
        }).then(post =>res.send(JSON.stringify(post)))
            .catch(err=>console.log(err))
    }
    // If session does not contain the user email then it will send "not logged in" as a response to the client
    else {
        res.send("Not logged in");
        console.log("Not logged in");
    }
});

// Error for failing image upload
const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};


module.exports=router;