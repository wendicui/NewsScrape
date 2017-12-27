$(document).ready(function(){
    $('.modal').modal();

    initPage();

    //get all the exisitng data
    function initPage(){

        $.get('/all-saved',function(data){
            console.log(data)
            populate(data)
        })
    }

    function populate(data){
        $(".data").empty();
        for (var i = 0; i< data.length; i++) {
            var value = data[i];
            var newDiv = $('<div class = "row">')
            newDiv.append(`<div class = "col s12">`
                            + `<div class = 'card horizontal teal' >`
                                + `<div class = "card-stacked">`
                                    + `<div class = "card-content white-text">`
                                        + `<span class = "card-title"> ${value.title}</span>`
                                        + `<p> ${value.description}</p>`
                                    +  `</div>`
                                + `</div>`
                                +` <a class="btn-floating red"><i class="material-icons" id = "delete">remove</i></a>
                                  <a class="btn-floating yellow darken-1 modal-trigger" href = "#model_${i}"><i class="material-icons" id = "notes">note_add</i></a>`
                            +  `</div>`
                        + `</div>`

                            )
            var model = $("<div class = 'modal'>")
            model.attr("id", `modal_${i}`)
            model.append(`
                    <div class="modal-content">
                      <h4>Modal Header</h4>
                      <p>A bunch of text</p>
                    </div>
                    <div class="modal-footer">
                      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                  </div>`)
            $('body').append(model)
            $(".data").append(newDiv)
            }
    }

})
