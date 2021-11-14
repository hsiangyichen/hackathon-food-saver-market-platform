
// var googleUser = {};
const startApp = function () {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
         auth2 = gapi.auth2.init({
            client_id: '704955964578-h12ktncaj45noqmmb3q3hu9vrtkhh5ol.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        // attachClick(document.getElementById('customBtn'));
        attachClick(document.getElementById('loginGoogleBtn'),true);
        attachClick(document.getElementById('signUpGoogleBtn'),false);
    });
};

const attachClick=(element,type) =>{
    auth2.attachClickHandler(element, {},
        function (googleUser) {
            var profile = googleUser.getBasicProfile();
            var data={
                name:profile.getName(),
                email:profile.getEmail(),
                pic:profile.getImageUrl(),            
            }
            type?googleLogin(data.email):googlesignUp(data);
            
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile
                .getEmail()); // This is null if the 'email' scope is not present.
            document.getElementById('name').innerText = "Signed in: " +
                googleUser.getBasicProfile().getName();
        },
        function (error) {
            //alert(JSON.stringify(error, undefined, 2));
        });
}
const googleLogin=(email)=>{
    const data={
        email:email,
        kind:"google",
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

const googlesignUp=(profile)=>{
    const data={
        name:profile.name,
        email:profile.email,
        password:'',
        pic:profile.pic,
        kind:'google',
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
