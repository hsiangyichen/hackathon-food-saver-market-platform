const normalLogin=(data)=>{
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

const normalSignUp=(data)=>{
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
