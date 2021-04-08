"use strict";
const mysql = require("mysql");
const util = require("util");
require("dotenv").config();

var connection = mysql.createPool({
  host: process.env.mysql_host,
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  database: process.env.mysql_database,
});

connection.getConnection((err, con) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
  }

  if (con) {
    con.release();
    console.log("Connected to Database!");
  }

  return;
});

connection.query = util.promisify(connection.query);

module.exports = connection;
