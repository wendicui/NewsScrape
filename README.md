# NewsScrape

#### Main Skills:
  * cheerio
    scraping data
    ```javascript
     request("https://www.nytimes.com/", function(err, res, html){
             var $ = cheerio.load(html);

             $("article.story").each(function(i, element){
                 var title = $(element).find("a").text();

             })
       })
     ```
      
  * cheerio with express: use setTimeout for response.
      ```javascript
      setTimeout(function(){
                var num2
                Article.count({}, function(err,data){
                    if (err){console.log(err)}
                    else{
                        num2= data;
                        var added = num2 - num;
                        console.log(added)
                        if(added > 0 ){
                            response.send(`${added} articles are added`)
                        }else{
                            response.send("No new articles for now")
                        }
                    }
                })},2000)
      ```
                
* Mongoose
  ```javascript
  Article.findById(idtoSearch, function(err, data){
        data.selected = false;
        data.Comments = [];
        data.save();

    })

  Article.find({"selected": true}).sort({_id:-1}).exec(function(error, data){
    if(error){
      console.log(error);
    }else{
      res.json(data);
    }
  });
  ```

  [documentation](http://mongoosejs.com/docs/queries.html)


* Materilize with Modal

  ```html 
      var model = $("<div class = 'modal' style = 'z-index:1003'>")
      model.attr("id", `modal${num}`)
      model.append(`
              <div class="modal-content">
                <h5>${data}</h5>
            </div>`)
      $('body').append(model)
      $('.modal').modal();
      $(`#modal${num}`).modal('open')
  ```

   or create a modal-trigger associated with modal by id;
   
   __dynamically generated item need to be initiated with__ ` $('.modal').modal()` __dynamically__

       
          
     
    
