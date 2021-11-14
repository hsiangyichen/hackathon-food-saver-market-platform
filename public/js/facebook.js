// const { password } = require("../../src/config");


(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the persopren.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        login(response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.log('The person is logged into Facebook, but not your app');
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.log("The person is not logged into Facebook");
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function facebook_login(islogin) {
    FB.login(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            var access_token = response.authResponse.accessToken; //get access token
            var user_id = response.authResponse.userID; //get FB UID
            
            FB.api(`/me?fields=name,email,picture &access_token=${response.authResponse.accessToken}`, function (
                response) {
                var data={
                    name:response.name,
                    email:response.email,
                    pic:response.picture.data.url,            
                }
                console.log(data)
                user_email = response.email; //get user email
                // you can store this data into your database      
                islogin?FBlogIn(data.email)  :FBsignUp(data)     
            });

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'public_profile,email'
    });
}

const FBlogIn=(email)=>{
    const data={
        email:email,
        kind:"facebook",
        password:'',
    }
    $.ajax({
        url: '/logIn',
        data: JSON.stringify(data),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(returnData){
            console.log(returnData);
        },
        error: function(xhr, ajaxOptions, thrownError){
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

const FBsignUp=(profile)=>{
    const data={
        name:profile.name,
        email:profile.email,
        password:'',
        pic:profile.pic,
        kind:'facebook',
    }
    $.ajax({
        url: '/signUp',
        data: JSON.stringify(data),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(returnData){
            console.log(returnData);
        },
        error: function(xhr, ajaxOptions, thrownError){
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}
