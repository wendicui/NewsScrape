$(document).ready(function(){
    //get existing articles
    $.get('/all',function(data){
        console.log(data)
    })


})
