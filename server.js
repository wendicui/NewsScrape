var express = require('express');
var bodyParser = require('body-parser');

//set up app
var app = express();
var PORT = process.env.PORT || 5000;

//handle data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//static directory
app.use(express.static('public'));

//routes
//require("./routes/html-routes.js")(app);
//require("./routes/comments-routes.js")(app);
require("./routes/news-routes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
