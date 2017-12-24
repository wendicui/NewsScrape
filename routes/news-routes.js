var express = require("express");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio")

module.exports = function(app){
    //connect with db

    mongoose.connect('mongodb://localhost/articles')
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
        Comments: [{ body: String} ]
    })

    //create model
    var Article = mongoose.model("Article", articleSchema);

    //scrape route
    app.get("/scrape", function(req, res){
        request("https://www.nytimes.com/", function(err, res, html){

            var $ = cheerio.load(html);
            $("article.story").each(function(i, element){
                    //results.push("here")
                    //getting the element
                    var title = $(element).find("a").text();
                    var url = $(element).find("a").attr("href");
                    var sum = $(element).find("p.summary").text();

                    //adding to database

                    if(i <= 14){
                        var newArticle = new Article ({
                            title: title,
                            url:url,
                            description: sum.trim()
                        })
                        newArticle.save()
                        
                    }
            })
        })
        res.json("back")
    })
}
