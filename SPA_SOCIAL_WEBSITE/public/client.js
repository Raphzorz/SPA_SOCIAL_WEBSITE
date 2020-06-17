var oneDivToRuleThemAll;
//Set up page when window has loaded
window.onload = init;
// Displays posted 1 day ago.... etc.....
function loadTimeAgo() {
    $(document).ready(function () {
        $('time.timeago').timeago();
        $.timeago.settings.allowFuture = true;
    });
}
function init() {

    // Display loading screen when ajax runs
    $body = $("body");
    $(document).on({
        ajaxStart: function () {
            $body.addClass("loading");
        },
        ajaxStop: function () {
            $body.removeClass("loading");
        }
    });

    oneDivToRuleThemAll = document.createElement("div");
      var docBody = document.getElementsByTagName("body")[0];

    docBody.appendChild(oneDivToRuleThemAll);
    docBody.style.overflow = "hidden"; // Removes the scrollbar

    checkForLogin();


    function fetchData(url) {
        return $.ajax({
            url: url,
            dataType: "json",
            data: "data",
            method: 'post'
        });
    }

    //  Searching
    $("#search-form").submit(function (event) {
        event.preventDefault();
        let form = $(this);
        $.when(fetchData('/users/get-details'), fetchFilteredData(form), fetchData('/posts/get-comment-details'))
            .then(function (userDetails, filteredPost, comments) {
                $('#to-add-feed-to').html( " ");
                loadNewsFeedPosts(userDetails,filteredPost,comments);
            })
    });

// Fetches the filtered data when a user searches for a post
    function fetchFilteredData(form) {
        return $.ajax({
            dataType: "json",
            type: 'post',
            url: '/posts/search',
            data: form.serialize(),
        })
    }

// Creates the registration page if a user is not logged in
    function createRegisterPage() {
        let registrationFormDiv = document.getElementById("add-content");
        registrationFormDiv.innerHTML = `    
                <div id='registered-change' class=\"col-md-6 float-right\">
                    <div class="jumbotron">
                      <h1 class="display-4">Sign up now</h1>
                      <p class="lead">Chrono Network allows everyone who is playing chrono-spark to easily connect and share content. Fill in the form below to get started.</p>
                      <hr class="my-4">
                    </div>
                    <form id=\"add-form\" class="ml-5" novalidate>
                        <div class=\"form-row\">
                            <div class=\"col-md-4 mb-3 md-form\">
                                <label for=\"name\">First name</label>
                              <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" placeholder=\"First name\" required>
                                <div class=\"invalid-feedback\">
                                Please enter your name
                                </div>
                             </div>
                             <div class=\"col-md-4 mb-3 md-form\">
                                 <label for=\"lastname\">Last name</label>
                                 <input type=\"text\" class=\"form-control\" id=\"lastname\"  name=\"lastname\" placeholder=\"Last name\"required>
                                 <div class=\"invalid-feedback\">
                                     Please enter your last name
                                 </div>
                             </div>
                         </div>
                         <div class=\"form-row\">
                             <div class=\"col-md-3 mb-3 md-form\">
                                 <label for=\"dateOfBirth\">Date Of Birth</label>
                                 <input type=\"date\" class=\"form-control\" id=\"dateOfBirth\" name=\"dateOfBirth\"
                                        required>
                                 <div class=\"invalid-feedback\">
                                     Please enter your date of birth
                                 </div>
                             </div>
                             <div class=\"col-md-5 mb-3 md-form\">
                                 <label for=\"email\">Email</label>
                                 <input type=\"email\" class=\"form-control\" id=\"email\" name=\"email\" placeholder=\"your email address\" required>
                                 <div class=\"invalid-feedback\">
                                     Please provide a valid email
                                 </div>
                                 <div class="invalid-feedback">
                                     Your email has already been registered. Choose a different one.
                                 </div>
                             </div>
                         </div>
                         <div class =\"form-row\">
                             <div class=\"col-md-3 mb-3 md-form\">
                                 <label for=\"passcode\">Password</label>
                                 <input type=\"password\" class=\"form-control\" id=\"passcode\" name=\"passcode\"placeholder=\"Chosen Password\" required>
                                 <div class=\"invalid-feedback\">
                                     Your password must be at least 6 characters long and must contain at least 1 number and 1 letter
                                 </div>
                             </div>
                              <div class=\"col-md-3 mb-3 md-form\">
                                 <label for=\"passcode\">Confirm Password</label>
                                 <input type=\"password\" class=\"form-control\" id=\"passcode-confirm\" name=\"passcode-confirm\" placeholder=\"Retype password\" required>
                                 <div class=\"invalid-feedback\">
                                     Your passwords do not match
                                 </div>
                             </div>
                         </div>
                         <button class=\"btn upload-btn bg-primary-purple text-white\" name =\"submit\" type=\"submit\">Complete Registration</button>
                     </form>
                     </div>
                     <div class=\"col-md-6 float-left no-pad-left register-image left-column\">
                     </div>`

    }

    // The skeleton to which the rest of the content will attach is created
    function createPageSkeleton() {
        let newsFeedDiv = document.getElementById("add-content");
        newsFeedDiv.innerHTML = `<!-- page-header -->
            <div class='jumbotron '>
                <h1 class="mx-auto my-0 text-center text-uppercase blink_me main-text">Chrono-Network</h1>
            </div>
            <!-- page-header-->
            <!-- news -->
            <div class='container-fluid post-wrapper'>
                <div class='row'>
                    <div id ='to-add-news-feed-to' class='col-md-3 ml-5'></div>
                        <div id = 'to-add-posts-to' class= 'col-md-6 post-main'>
                        <div id = 'to-add-feed-to'>
                        </div>
                        </div>
                        <div class= 'col-md-2 side-column'>
                        </div>
                    </div>
                </div>
            </div>`;
        getNewsFeedData();
    }

    function getNewsFeedData() {
        // The functions will only run when all of the 3 ajax requests have completed
        $.when(fetchData('users/get-details'), fetchData('/posts/get-post-details'), fetchData('posts/get-comment-details'))

            .then(function (userDetails, post, comments) {
                createNewsFeedUser(userDetails, post, comments)
            })
    }

    // The news feed is populated
    function createNewsFeedUser(userDetails, post, comments) {

        let loggedUserName = userDetails[0][0].name;  // The extra [0] is there because each argument is an array with the following structure: [ data, statusText, jqXHR ]
        let loggedUserLastName = userDetails[0][0].lastname;
        let profileImage = (userDetails[0][0].profilePicture);

        let profilePicture;
        if (profileImage) {
            profilePicture = `<img class="card-img-top" id='profile-image' src="${profileImage + "?rnd=" + Math.random()}" alt="Card image cap">`;
        } else {
            profilePicture = `<img class="card-img-top" id='profile-image' src="img/blank-profile.png"  alt="Card image cap">`;
        }
        let userCardHtml = `
                <div class="card user-card " >
                <div class="card-header bg-primary-purple user-post-text m-0 ">${loggedUserName} ${loggedUserLastName}</div>
                 <form id='upload-profile-picture-form' enctype='multipart/form-data'>
                ${profilePicture}  
                 <div class='form-group'>
                            <div class='custom-file'>
                                <input type='file' name='profile-upload' class='custom-file-input' id='profile-upload'>
                                <input type='hidden' id='profile-image-path' name='profile-image-path' value=''>
                                <label id="profile-label" class='custom-file-label' for='profile-upload'>Choose image</label>
                            </div>
                        </div>
                            <div>
                                <div>
                                <button type='submit'  class='max-width btn upload-btn text-white buttons-color'>Update Profile Picture</button>
                            </div>
                        </div>
                    </form>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Age: ${calculateAge(userDetails[0][0].dateOfBirth)}</li>
                        <li class="list-group-item">Date of Birth: ${userDetails[0][0].dateOfBirth}</li>
                        <li class="list-group-item">Member since: ${userDetails[0][0].createdAt}</li>
                    </ul>
                </div>
            </div>`;

        // The user's age is calculated
        function calculateAge(dateString) {
            let today = new Date();
            let birthDate = new Date(dateString);
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }

        $(userCardHtml).appendTo("#to-add-news-feed-to");

        <!--- \\\\\\\This is the post that the user will make-->
        let createPostHtml = `
                    <div class='card post-card cool-shadow'>
                        <div class='card-header bg-primary-purple'>
                            <div class='d-flex justify-content-between align-items-center'>
                                <div class='d-flex justify-content-between align-items-center'>
                                    <div class='mr-2'>
                                        <img class='img-thumbnail' width='45' src="${profileImage + "?rnd=" + Math.random()}" alt=''>
                                    </div>
                                    <div class='ml-2'>
                                        <div class='user-post-text m-0'>${loggedUserName} ${loggedUserLastName}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form id='create-post-form' enctype='multipart/form-data'>
                            <div class='card-body'>
                                <div class='tab-content' >
                                    <div>
                                        <div class='form-group'>
                                            <label class='sr-only' for='textBody'>post</label>
                                            <textarea class='form-control' id='textBody' name='textBody' rows='3' placeholder='What are you thinking ${loggedUserName}?'></textarea>
                                        </div>
                                    </div>
                                    <div class='form-group'>
                                       <div class='custom-file'>
                                          <input type='file' name='image-upload' class='custom-file-input' id='image-upload'>
                                          <input type='hidden' id='image-path' name='image-path' value=''>
                                          <label id="upload-image-label" class='custom-file-label' for='image-upload'>Choose image</label>
                                    </div>
                                    <div class='py-4'><p class="text-danger font-weight-bold d-none" id="empty">You need to add some text!</p></div>
                                </div>
                            </div>
                            <div class='btn-toolbar justify-content-between'>
                                <div class='btn-group'>
                                <button type='submit' class='btn upload-btn buttons-color text-white'>Upload Post</button>
                                </div>
                            </div>
                        </form>
                    </div>
                 </div>
             </div>
        </div>`;

        // Upon profile image upload the image path will be shown when it is selected
        $('#profile-upload').on('change', function () {
            let fileName = $(this).val();
            let replace = fileName.replace("fakepath\\", "");
            $("#profile-label").text(replace);
        });
        // Upon image upload the image path will be shown when it is selected
        $('#add-content').on('change', '#image-upload', function () { // Delegating it to the closest static container
            let fileName = $(this).val();
            let replace = fileName.replace("fakepath\\", "");
            $("#upload-image-label").text(replace);
        });

        $(createPostHtml).prependTo("#to-add-posts-to");
        loadNewsFeedPosts(userDetails,post,comments)
    }

    function loadNewsFeedPosts(userDetails, post, comments) {

        let loggedUserName = userDetails[0][0].name;  // The extra [0] is there because each argument is an array with the following structure: [ data, statusText, jqXHR ]
        // For every post a new post will be created

        for (let i in post[0]) {
            if (post[0].hasOwnProperty(i)) {
                let textBody = post[0][i].textBody;
                let postedAt = post[0][i].createdAt;
                let postUser = post[0][i]["User.name"] + " " + post[0][i]["User.lastname"];
                let postUserPic = post[0][i]["User.profilePicture"];
                let postedImage = post[0][i].image;
                let commentHTML = [];

                // For every comment that exists inside of the current post, the comment will be added
                for (let c in comments[0])
                    if (post[0][i].id === comments[0][c].postId)
                        commentHTML.push(`<div class='bg-comments border-radius mt-3'>
                                  <div class=' d-flex justify-content-between align-items-center'>
                                     <div class='d-flex justify-content-between align-items-center'>
                                        <div class='mr-2'>
                                            <img class='img-thumbnail ml-3' width='45' src=${comments[0][c]['User.profilePicture']+"?rnd="+Math.random()} alt=''>
                                        </div>
                                        <div class='ml-2'>
                                            <div class='font-weight-bold text-purple m-0'>${comments[0][c]['User.name'] + " " + comments[0][c]['User.lastname']}</div>
                                        </div>
                                        <p class='card-text mt-3 ml-3 mr-3'>${comments[0][c].commentBody}</p>                                                    
                                    <time class="timeago text-muted small-text" datetime=${comments[0][c].createdAt}></time>
                                     </div>
                                  </div>
                                </div>`);

                    // Create a post
                let imageAddition = "<div></div>";
                if (postedImage.includes('image')) {
                    imageAddition = "<img class='card-img-top' src='" + postedImage + "' alt='Image'>";
                }
                let userPostHtml = `   
                             <div class='card post-card cool-shadow'>\
                                <div class='card-header bg-primary-purple'>\
                                  <div class='d-flex justify-content-between align-items-center'>\
                                     <div class='d-flex justify-content-between align-items-center'>\
                                        <div class='mr-2'>\
                                            <img class='img-thumbnail' width='45' src=${postUserPic+"?rnd="+Math.random()} alt=''>\
                                        </div>\
                                        <div class='ml-2'>\
                                            <div class='user-post-text m-0'>${postUser}</div>\
                                        </div>\
                                     </div>\
                                  </div>\
                                </div>\
                        ${imageAddition}\
                                <div class='card-body'>\
                                    <p class='card-text'>${textBody}</p>\
                                   <span class="text-muted small-text">Posted</span> <time class=\"timeago text-muted small-text\" datetime=${postedAt}></time>\
                                </div>\
                                <div class='card-footer'>             
                                    <a href='/' class='card-link'><i class='fa fa-comment'></i> Comments (${commentHTML.length})</a>
                                </div>
                                <div class='card-body no-padding-top'>${commentHTML.join("")}</div>
                              
                             <form class="comment-form">
                <div class='card-body'>
                    <div class='tab-content'>
                        <div>
                            <div class='form-group'>
                                <textarea class='form-control' name='commentTextBody' rows='3' placeholder='Post a comment ${loggedUserName}?'></textarea>
                                <input type="hidden" name="postId" value="${post[0][i].id}">
                            </div>
                        </div>
                    </div>
                    <div class='btn-toolbar justify-content-between'>
                        <div class='btn-group'>
                        <button type='submit' class='btn upload-btn buttons-color text-white'><i class='fa fa-comment'></i> Post Comment</button>
                        </div>
                    </div>
                </form>
                </div>`;
                $(userPostHtml).appendTo("#to-add-feed-to");
            }
        }
        // Creating the comment (Saving to database)
        $(".comment-form").submit(function (event) {
            var form = $(this);
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create-comment',
                data: form.serialize(),
                success: function () {
                    sessionStorage["scrollPosition"] = $(window).scrollTop();
                    createPageSkeleton();
                }
            })
        });

        $(window).scrollTop(sessionStorage["scrollPosition"]);
        sessionStorage.clear();
        loadTimeAgo();
        // console.log($("html").html())

    }
    // Checks whether hte user is logged in. If the user is not logged in then the registration page will be displayed
    function checkForLogin() {
        let loginBar = document.getElementById("login-form");
        let searchBar = document.getElementById("search-form");

        $.post("/users/check-login", function (data) {
            if (data === "logged") {
                searchBar.innerHTML = `<form class="form-inline" action="">
                                         <input class="form-control no-gutters no-border-radius" type="text" name="search" placeholder="Search Posts">
                                          <button class="btn mr-3 bg-light no-border-radius-left" type="submit">Search Posts <i class="fa fa-search"></i></button>
                                            </form>`;
                loginBar.innerHTML = `<button type=\"submit\" class=\" mb-2 mt-2 btn text-white bg-transparent log-btn\">Sign out <i class=\"fa fa-sign-out text-white\"></i></button>`;
                createPageSkeleton();
                docBody.style.overflow = "visible"; // Re-enables scroll-bar
            } else {
                docBody.style.overflow = "hidden";
                searchBar.innerHTML = '';
                loginBar.innerHTML = `    <form id="login-form" class="form-inline">
                            <div class="form-group mt-3 mr-3 justify-content-center">
                           <p id="wrong-credentials" class="d-none font-weight-bold text-warning">Incorrect Credentials!</p>
                        </div>
                        <div class=\"form-group mb-2 mt-2 justify-content-center\">
                            <input type=\"text\" name=\"emailLogin\" id=\"emailLogin\" class=\"form-control\" placeholder=\"Your email address\" maxlength=\"100\">
                        </div>
                        <div class=\"form-group mb-2 mt-2 justify-content-center ml-2  \">
                            <input type=\"password\" name=\"passcodeLogin\" class=\"form-control\" id=\"passcodeLogin\" placeholder=\"Password\">
                        </div>
                         <div class=\"form-group mb-2 mt-2 justify-content-center ml-2  \">
                        <button type=\"submit\" class=\"btn text-white bg-transparent log-btn\">Sign in <i class=\"fa fa-sign-in text-white\"></i></button>
                        </div>
                        </form>
                        </div>`;
                createRegisterPage();
            }
        });
    }

    // Prompts the user to login following successful registration
    function createRegisteredSuccessfullyText() {
        let textToChange = document.getElementById('registered-change');
        textToChange.innerHTML = `
        <div class="jumbotron">
            <h1 class="display-4">You have been registered!</h1>
        <p class="lead">Please sign in at the top of the page to start interacting with the chrono community</p>
        <hr class="my-4">
        </div>`;
    }

// Registration function JQUERY
    $(function () {
        $('#add-content').on('submit', '#add-form', function (e) { // Delegating it to the closest static container
            // alert("Did this");
            e.preventDefault();
            if (validateRegistration()) {
                $.ajax({
                    type: 'post',
                    url: '/users/register',
                    data: $('form').serialize(),
                    success: function (response) {
                        if (response === "registered") {
                            createRegisteredSuccessfullyText();
                        }
                        else {
                            notValid(document.getElementById('email'),4);
                        }
                    }
                })
            }
        })
    });

    // Styles the form red whenever a user inputs incorrectly
    function notValid(obj,value){
        obj.style.border = 'solid 2px red ';
        let feedBack = document.getElementsByClassName("invalid-feedback");
        feedBack[value].style.display = "block";
    }
    // Styles the form green whenever a user inputs correctly
    function valid(obj,value){
        obj.style.border = 'solid 2px green ';
        let feedBack = document.getElementsByClassName("invalid-feedback");
        feedBack[value].style.display = "none";
    }

    function validateRegistration() {

        let errorCount = 0;
        const name = $('#name').val();
        //User name must be between 3-12 characters, contain no spaces and/or special characters or numbers
        if ( $.trim(name) === '' ) {
            notValid(document.getElementById('name'),0);
            ++errorCount;
        }
        else {
            valid(document.getElementById('name'),0);
        }
        const lastName = $('#lastname').val();

        if ( $.trim(lastName) === '' ) {
            notValid(document.getElementById('lastname'),1);
            ++errorCount;
        }
        else {
            valid(document.getElementById('lastname'),1);
        }

        const dateOfBirth = $('#dateOfBirth').val();

        if (!/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(dateOfBirth)) {
            notValid(document.getElementById('dateOfBirth'),2);
            ++errorCount
        }
        else {
            valid(document.getElementById('dateOfBirth'),2);
        }

        const userEmail = $('#email').val();
        //Confirms that it is in email format
        if (!(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{3,})$/.test(userEmail))) {
            notValid(document.getElementById('email'),3);
            ++errorCount
        }
        else {
            valid(document.getElementById('email'),3);
        }
        const password = $('#passcode').val();
        //Minimum eight characters, at least one letter and one number:
        if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).test(password)) {
            notValid(document.getElementById('passcode'),5);
            ++errorCount
        }
        else {
            valid(document.getElementById('passcode'),4);
        }
        let passwordConfirm = $('#passcode-confirm').val();
        // Confirms that the passwords entered match
        if (passwordConfirm !== password || passwordConfirm ==='') {
            notValid(document.getElementById('passcode-confirm'),5);
            ++errorCount
        }
        else {
            valid(document.getElementById('passcode-confirm'),5);
        }
        return errorCount <= 0;
    }

    // Upload an image or post
    $(function () {
        $('#add-content').on('submit', '#create-post-form', function (e) { // Delegating it to the closest static container
            let dataToSend = $('form').serialize();
            e.preventDefault();            // alert($('form').serialize());
            if (document.getElementById("image-upload").files.length !== 0) {
                let formData = new FormData(this);
                $.ajax({
                    url: '/posts/upload',
                    type: 'POST',
                    data: formData,
                    success: function (uploadedFileName) {
                        $("#upload-image-label").text("");
                        postToNewsFeed(dataToSend, uploadedFileName);
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            } else {
                if (document.getElementById("textBody").textLength ===0){
                    $('#empty').removeClass("d-none");
                    return false;
                }
                postToNewsFeed(dataToSend, null)
            }
        });
    });

// Upload a new profile picture
    $(function () {
        $('#add-content').on('submit', '#upload-profile-picture-form', function (e) { // Delegating it to the closest static container
            e.preventDefault();            // alert($('form').serialize());
            if (document.getElementById("profile-upload").files.length !== 0) {
                let formData = new FormData(this);
                $.ajax({
                    url: '/users/upload-profile-image',
                    type: 'POST',
                    data: formData,
                    success: function (response) {
                        document.getElementById("profile-image").src= response+"?rnd="+Math.random(); // Allows the profile image to immediately refresh once uploaded
                        $("#profile-label").text("");
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }
        });
    });

    //Post text to the news feed
    function postToNewsFeed(formData,filepath){
        $.ajax({
            type: 'post',
            url: '/posts/post-to-news-feed',
            data: formData + '&image='+ filepath,
            success: function (response) {
                if (response === "posted") {
                    $("#textBody").val(""); // Clears the text box after post
                    $.when(fetchData('users/get-details'), fetchData('/posts/get-post-details'), fetchData('posts/get-comment-details'))
                        .then(function (userDetails, post, comments) {
                            $('#to-add-feed-to').html(" ");
                            loadNewsFeedPosts(userDetails, post, comments)
                        })
                }
            }
        })
    }

// Login function
    $(function () {
        $('#login-form').on('submit', function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/users/login',
                data: $('form').serialize(),
                success: function (response) {
                    if (response==="ok"){
                        checkForLogin()
                    }
                    else {
                        let warning = document.getElementById('wrong-credentials');
                        $("#wrong-credentials").removeClass("d-none");
                        setTimeout(function(){
                            $("#wrong-credentials").addClass("d-none");
                        }, 3000);
                        console.log(warning);
                    }
                }
            })
        })
    })};





