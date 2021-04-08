const crypto = require("crypto-js");

module.exports = (text) => {
  const chiper = crypto.AES.decrypt(
    text,
    crypto.enc.Utf8.parse("etTXbr5L9JfQ4AaLpws9R9ZB7ZgUg4qK"),
    {
      iv: crypto.enc.Utf8.parse("epUH9MXV33Dx6d4T"),
      mode: crypto.mode.CBC,
    }
  );

  return crypto.enc.Utf8.stringify(chiper).toString();
};
