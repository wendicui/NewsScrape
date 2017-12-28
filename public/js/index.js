$(document).ready(function(){
var num = 0;
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
    for (var i = data.length - 1; i >=0; i--) {
        var value = data[i];
        var newDiv = $('<div class = "row">')
        newDiv.append(`<div class = "col s12">`
                        + `<div class = 'card horizontal teal'>`
                            + `<div class = "card-stacked">`
                                + `<div class = "card-content white-text">`
                                    + `<a class = "card-title white-text" href = ${value.url}> ${value.title}</a>`
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
        num ++
        $.get('/scrape', function(data){
            console.log(data)
            modalFire(data, num)
            initPage()
        })
    })

function modalFire(data,num){
    //create modal
    var model = $("<div class = 'modal' style = 'z-index:1003'>")
    model.attr("id", `modal${num}`)
    model.append(`
            <div class="modal-content">
              <h5>${data}</h5>
          </div>`)
    $('body').append(model)
    $('.modal').modal();
    $(`#modal${num}`).modal('open')
}
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


})
