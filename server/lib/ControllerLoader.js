const fs = require("fs");

// Getting an Array of the files in the 'controllers' folder.
let files = fs.readdirSync(__dirname + "/../controller");
const db = require("../db");

module.exports = (app) => {
  let index = 0;
  files.forEach((fileName) => {
    require(__dirname + "/../controller/" + fileName)(app, db);
    index++;
    console.log(fileName + " Loaded...");
  });
  console.log("Loaded " + index);
};
