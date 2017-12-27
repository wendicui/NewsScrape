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
                                  <a class="btn-floating yellow darken-1 modal-trigger" href = "#modal${i}"><i class="material-icons" id = "notes">note_add</i></a>`
                            +  `</div>`
                        + `</div>`

                            )
            //create model
            var model = $("<div class = 'modal' style = 'z-index:1003'>")
            model.attr("id", `modal${i}`)
            model.append(`
                    <div class="modal-content">
                      <h5>Notes for Artile </h5>
                      <h6><i> ${value.title}</i></h6>
                      <ul class = "previousNotes"></ul>
                      <div class="input-field col s12">
                          <i class="material-icons prefix">mode_edit</i>
                          <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                          <label for="icon_prefix2"></label>
                        </div>
                    </div>
                    <div class="modal-footer">
                      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" data=${value._id}>Submit</a>
                  </div>`)
            $('body').append(model)
            $(".data").append(newDiv)
            $('.modal').modal();
            }
    }

    $('body').on("click", ".modal-action", function(){
        var content = $(".materialize-textarea").val();
        $(".materialize-textarea").val("")
        console.log(content)
        var id = $(this).attr("data")
        console.log(id)

        var object = {
            item:id,
            data:content
        }
        console.log(object)

        //add the comment to database
        $.ajax({
            method:"PUT",
            url:"/scrape/comment",
            data:object
        }).then(function(data){
            console.log("saved")
            initPage();
        })

    })





})
