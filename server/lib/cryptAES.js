const Crypto = require("crypto-js");

module.exports = (text) => {
  const chiper = Crypto.AES.encrypt(
    text,
    Crypto.enc.Utf8.parse("etTXbr5L9JfQ4AaLpws9R9ZB7ZgUg4qK"),
    {
      iv: Crypto.enc.Utf8.parse("epUH9MXV33Dx6d4T"),
      mode: Crypto.mode.CBC,
    }
  );

  return chiper.toString();
};
