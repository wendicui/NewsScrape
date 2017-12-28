var express = require("express");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio")

module.exports = function(app){
    //connect with db
    var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ccdicss'
    mongoose.connect(MONGODB_URI)
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("we're connected!")
    });

    mongoose.plugin(schema => { schema.options.usePushEach = true });

    //create a new schema
    var articleSchema = mongoose.Schema({
        title:String,
        url:String,
        description:String,
        id:String,
        selected:Boolean,
        Comments: []
    })

    //create model
    var Article = mongoose.model("Article", articleSchema);



    //scrape route
    app.get("/scrape", function(req, response){
        var num
        Article.count({}, function(err,data){
            if (err){console.log(err)}
            else{
                num = data
            }
        })

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
                    if(data.length === 0){
                        //console.log("herer")
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
                        //console.log(res)

                    }
                })
//}
            })

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
        })

    })

//get all the data except for the saved ones
    app.get("/all-nonsaved", function(req, res){
        Article.find({"selected": false}).sort({_id:-1}).exec(function(error, data){
            if(error){
                console.log(error);
            }else{
                res.json(data);
            }
        });
    });

//get all the saved data
    app.get("/all-saved", function(req, res){
    	Article.find({"selected": true}).sort({_id:-1}).exec(function(error, data){
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

//unsave an article
    app.put("/scrape/unsave", function(req, res){
        var idtoSearch = req.body.item
        console.log(req.body)
        Article.findById(idtoSearch, function(err, data){
            data.selected = false;
            data.Comments = [];
            data.save();

        })
        res.json("working")
    })

//update Comments
    app.put("/scrape/comment", function (req,res){
        var idtoSearch = req.body.item
        var content = req.body.data
        Article.findById(idtoSearch, function(err,data){
            console.log(data.Comments)
            data.Comments.push(content)
            console.log(data.Comments)
            data.save(function(err){
                if(err){console.log(err)}
                else{console.log("saved")}
            })
        })
        res.json("added")
    })

//delete comments
    app.put("/scrape/comment/delete", function(req, res){
        var index = req.body.item
        var id = req.body.id
        Article.findById(id, function(err, data){
            data.Comments.splice(index,1);
            data.save();

        })
        res.json("working")
    })
}
