const jwtoken = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
var path = require("path");

exports.generateAccessToken = async (user) => {
  const test = await fs.readFileSync(
    path.join(__dirname, "..", "jwtRS256.key")
  );
  return jwtoken.sign(user, test.toString(), {
    algorithm: "RS256",
    expiresIn: "15m",
  });
};

exports.generateRefreshToken = async (user) => {
  const test = await fs.readFileSync(
    path.join(__dirname, "..", "jwtRS256-refresh.key")
  );
  return jwtoken.sign(user, test.toString(), {
    algorithm: "RS256",
  });
};
