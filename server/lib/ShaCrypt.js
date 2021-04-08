const crypto = require("crypto-js");

module.exports = (text) => {
  return new Promise((resolve, reject) => {
    const salt = Math.random()
      .toString(36)
      .slice(2);
    const sha = crypto.SHA256(text);
    return resolve(salt + "$" + sha.toString());
  });
};
