const crypto = require("crypto-js");

module.exports = (text, salted) => {
  return new Promise((resolve, reject) => {
    const aText = crypto.SHA256(text);
    const splited = salted.split("$")[1];
    return resolve(aText == splited);
  });
};
