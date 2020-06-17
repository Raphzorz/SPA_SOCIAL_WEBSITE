
QUnit.test("Calculate user age 26", function (assert) {

        let today = new Date();
        let birthDate = new Date('09/12/1992');
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;}
    assert.strictEqual( age, 26, "The expected calculated age is 26, the actual age is 26" );
        return age;

});

QUnit.test("Calculate user age 19", function (assert) {

    let today = new Date();
    let birthDate = new Date('01/01/2000');
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;}
    assert.strictEqual( age, 19, "The expected calculated age is 19, the actual age is 19" );
    return age;
});


QUnit.test("Label changes when uploading profile image", function (assert) {

    $('<label id="profile-label" class=\'custom-file-label\' for=\'profile-upload\'>Choose image</label>').appendTo('#qunit-fixture');
            let fileName = "C:\\fakepath\\test\\new-picture.jpeg";
            let replace =fileName.replace("fakepath\\", "");
            $("#profile-label").text(replace);
            assert.strictEqual($(`#profile-label`).text(),"C:\\test\\new-picture.jpeg","The text inside of the label was changed from Choose image to \"C:\\test\\new-picture.jpeg" +
                " upon choosing an image to upload")
});


QUnit.test("Regex validation email invalid", function (assert) {

    const userEmail = "bademail@loz";
    let result;
    //Confirms that it is in email format
    if (!(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{3,})$/.test(userEmail))) {
        result = "invalid";
    }
    else {
        result = "valid";
    }
    assert.strictEqual( result, "invalid", "The email bademail@loz should be marked as invalid" );
});

QUnit.test("Regex validation email valid", function (assert) {

    const userEmail = "Good@loz.com";
    let result;
    //Confirms that it is in email format
    if (!(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{3,})$/.test(userEmail))) {
        result = "invalid";
    }
    else {
        result = "valid";
    }
    assert.strictEqual( result, "valid", "The email bademail@loz should be marked as valid" );
});



