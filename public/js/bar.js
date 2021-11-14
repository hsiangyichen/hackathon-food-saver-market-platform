
$('.dropdown-item').on('click',(event)=>{
    $('#typeMenu').text($(event.target).text())
    $('#typeMenu').attr('tag',$(event.target).attr('tag'))
    getdata()
})

const getdata=()=>{
    $('#datalistOptions').empty()
    const data={
        name:$('#typeMenu').attr('tag'),
    }
    $.ajax({
        url: '/getSearch',
        data: JSON.stringify(data),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(returnData){
            for (let item of returnData) {
                $( "#datalistOptions" ).append( `<option  value="${item[$('#typeMenu').attr('tag')]}">` )
            }
            // console.log($( "#datalistOptions" ).children());
        },
        error: function(xhr, ajaxOptions, thrownError){
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}
$('#searchBtn').on('click',()=>{
    
    if($('#typeMenu').attr('tag')=="kind"){
        window.location.href="/storePage/"+$('#searchInput').val().toString()
    }else{
        $('#searchForm').children("input").attr('name',$('#typeMenu').attr('tag'))
        $('#searchForm').children("input").val($('#searchInput').val().toString())
        document.getElementById('searchForm').submit()
    }
})
