var express = require("express");
var path = require("path")
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars")
var PORT = process.env.PORT || 8080;

var app = express();
// var env = require("dotenv").config()

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, './parallax.js-1.5.0')))
app.use(express.static(path.join(__dirname, './materialize')))

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");
app.set('views', __dirname + '/views');


// Routes
require("./html-routes/html-routes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

app.listen(PORT, function () {
    console.log("App now listening at localhost:" + PORT);
});