var express = require("express");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio")

module.exports = function(app){
    //connect with db

    mongoose.connect('mongodb://localhost/news')
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("we're connected!")
    });

    //create a new schema
    var articleSchema = mongoose.Schema({
        title:String,
        url:String,
        description:String,
        id:String,
        selected:Boolean,
        Comments: [{ body: String} ]
    })

    //create model
    var Article = mongoose.model("Article", articleSchema);

    //scrape route
    app.get("/scrape", function(req, res){
        //make request
        request("https://www.nytimes.com/", function(err, res, html){
            var $ = cheerio.load(html);

            $("article.story").each(function(i, element){
                //results.push("here")
                //getting the element
                var title = $(element).find("a").text();
                var url = $(element).find("a").attr("href");
                var id = $(element).attr("id");
                var sum = $(element).find("p.summary").text();
 //if(i < 2){
                //adding to database
                Article.find({'url':url},function(err,data){
                    console.log(id)

                    if(data.length === 0){
                        console.log("herer")
                    //check whether the article is already stored
                        var newArticle = new Article ({
                            title: title.trim(),
                            url:url,
                            description: sum.trim(),
                            id:id,
                            selected:false
                        })
                        //console.log(newArticle)
                        newArticle.save()

                    }else{
                        console.log("already here")
                    }
                })
//}
            })
        })
        //why here is OK?
        res.json("done")
    })

//get all the data except for the saved ones
    app.get("/all-nonsaved", function(req, res){
    	Article.find({"selected": false}, function(error, data){
    		if(error){
    			console.log(error);
    		}else{
    			res.json(data);
    		}
    	});
    });

//get all the saved data
    app.get("/all-saved", function(req, res){
    	Article.find({"selected": true}, function(error, data){
    		if(error){
    			console.log(error);
    		}else{
    			res.json(data);
    		}
    	});
    });

//update the data saved attribute
    app.put("/scrape", function(req, res){
        var idtoSearch = req.body.item
        console.log(req.body)
        Article.findById(idtoSearch, function(err, data){
            data.selected = true;
            data.save();

        })
        res.json("working")
    })
}
