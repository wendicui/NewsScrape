$(document).ready(function(){

    initPage();

    //get all the exisitng data
    function initPage(){
        $.get('/all-saved',function(data){
            console.log(data)
            populate(data)
        })
    }

})
