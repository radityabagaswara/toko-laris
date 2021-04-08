var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const publicPath = path.join(__dirname, "./public");
const port = process.env.PORT || 4320;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(new cors());

app.get("/", function(req, res, next) {
  res.render("index");
});

require("./lib/ControllerLoader.js")(app);

var server = app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

module.exports = server;
