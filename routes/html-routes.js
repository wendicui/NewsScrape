
module.exports = function (app){

    app.get("/", function(req,res){
        res.sendFile( '/index.html')
    })

    app.get("/saved", function(req,res){
        res.sendFile( '/saved.html')
    })
}
