
module.exports = function (app){

    app.get("/", function(req,res){
        res.sendFile( '/index.html')
    })

    app.get("/saved", function(req,res){
        console.log("here")
        res.sendFile( '/saved.html')
    })
}
