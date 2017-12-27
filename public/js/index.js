$(document).ready(function(){

initPage();

//get all the exisitng data
function initPage(){
    $.get('/all-nonsaved',function(data){
        console.log(data)
        populate(data)
    })
}

// add data to page
function populate(data){
    $(".data").empty();
    for (var i = data.length - 1; i >= 0; i--) {
        var value = data[i];
        var newDiv = $('<div class = "row">')
        newDiv.append(`<div class = "col s12">`
                        + `<div class = 'card horizontal teal'>`
                            + `<div class = "card-stacked">`
                                + `<div class = "card-content white-text">`
                                    + `<span class = "card-title"> ${value.title}</span>`
                                    + `<p> ${value.description}</p>`
                                +  `</div>`
                            + `</div>`

                            +`<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons" id = ${value._id}>add</i></a>
    </div>`
                        +  `</div>`
                    + `</div>`

                        )
        $(".data").append(newDiv)
        }
}

// when user scrape new articles
    $(".scrape-new").on("click", function(){
        event.preventDefault();
        $.get('/scrape', function(data){
            initPage();
        })
    })

// when user save an article
    $('body').on("click", ".material-icons",function(){
        var id = $(this).attr("id");
        console.log(id)

        $.ajax({
            method:"PUT",
            url:"/scrape",
            data:{item: id}
        }).then(function(data){
            console.log("saved")
            initPage();
        })

    })

//when user wants to go to the saved page

$('body').on ("click", "#saved", function(){
    window.location.href = '/saved'
})



})
