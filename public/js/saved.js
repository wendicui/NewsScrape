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
        //create panel for each news
        for (var i = data.length - 1; i >= 0; i--) {
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
                                +` <a class="btn-floating red"><i class="material-icons" id = "delete" data=${value._id}>remove</i></a>
                                  <a class="btn-floating yellow darken-1 modal-trigger" href = "#modal${i}"><i class="material-icons" id = "notes">note_add</i></a>`
                            +  `</div>`
                        + `</div>`

                            )
            //create model for each news
            var model = $("<div class = 'modal' style = 'z-index:1003'>")
            model.attr("id", `modal${i}`)
            model.append(`
                    <div class="modal-content">
                      <h5>Notes for Artile </h5>
                      <h6><i> ${value.title}</i></h6>
                      <ul class = "collection" id=${value._id}></ul>
                      <div class="input-field col s12">
                          <i class="material-icons prefix">mode_edit</i>
                          <textarea id="icon_prefix2${value._id}" class="materialize-textarea"></textarea>
                          <label for="icon_prefix2${value._id}"></label>
                        </div>
                    </div>
                    <div class="modal-footer">
                      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" data=${value._id}>Submit</a>
                  </div>`)
            $('body').append(model)
            $(".data").append(newDiv)
            $('.modal').modal();
            previousComments(value);
            }

    }
// add comment to database
    $('body').on("click", ".modal-action", function(){
        var id = $(this).attr("data")
        console.log(id)
        var content = $(`#icon_prefix2${id}`).val();
        $(".materialize-textarea").val("")
        console.log(content)


        var object = {
            item:id,
            data:content
        }
        console.log(object)

        //remove all the existing li in collection
        $(".collection").empty();

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
//render all the previous lists
    function previousComments(data){
        //console.log(data.Comments.length)
            for (var i = 0; i < data.Comments.length; i++) {
                //create li for each of the comments
                var newlist = createList(data.Comments, i)
                //console.log(i)
                $(`#${data._id}`).append(newlist)
            }

    }

    function createList(data,i){
        var newlist = $(`<li class = "collection-item" data = ${i}>${data[i]}</li>`)
        newlist.append(`
                <a class="btn-floating btn-small red"><i class="material-icons" id = "deleteComment" data = ${i}>remove</i></a>
            `)
        return newlist
    }

//delete an comment
    $('body').on("click", "#deleteComment", function(){
        var i = $(this).attr('data')
        console.log(i)
        var id = $(this).parent().parent().parent().attr('id')
        console.log(id)

        var obj ={
            item:i,
            id:id
        }

        //remove all the existing li in collection
        $(".collection").empty();


        $.ajax({
            method:"PUT",
            url:"scrape/comment/delete",
            data:obj
        }).then(function(data){
            console.log("saved")
            initPage();
        })
    })
//unsave an article

    $('body').on("click", "#delete", function(){
        var id = $(this).attr("data")
        console.log(id)

        $.ajax({
            method:"PUT",
            url:"/scrape/unsave",
            data:{item: id}
        }).then(function(data){
            console.log("saved")
            initPage();
        })


    })
})
