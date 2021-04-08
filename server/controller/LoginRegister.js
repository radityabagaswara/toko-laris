const Joi = require("joi");
const cryptAES = require("../lib/cryptAES");
const decryptAES = require("../lib/decryptAES");
const ShaCrypt = require("../lib/ShaCrypt");
const ShaDecrypt = require("../lib/ShaDecrypt");
const crypto = require("crypto");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../lib/generateAccessToken");
const jwtoken = require("jsonwebtoken");
const { authenticateToken } = require("../Auth/Auth");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

module.exports = async (app, db) => {
  app.post("/register", async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
      confirm_password: Joi.ref("password"),
      phone_number: Joi.string().required(),
      address: Joi.string().required(),
    });

    const value = await schema.validate({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      phone_number: req.body.phone_number,
      address: req.body.address,
    });

    const cryptName = await cryptAES(value.value.name);
    const cryptEmail = await cryptAES(value.value.email);
    const shaPass = await ShaCrypt(value.value.password);
    const phone_number = await cryptAES(value.value.phone_number);
    const address = await cryptAES(value.value.address);

    db.query(
      "INSERT INTO user (name, email, password, phone_number, address, type) VALUES (?,?,?,?,?,?)",
      [cryptName, cryptEmail, shaPass, phone_number, address, "USER"]
    );

    res.json(value);
  });

  app.get("/check", authenticateToken, async (req, res) => {
    db.query(
      "SELECT * FROM user WHERE token = ?",
      [req.user],
      async (err, rows) => {
        if (err) {
          res.sendStatus(500);
          return console.error(err);
        }

        if (rows.length < 1) return res.sendStatus(403);

        res.json({
          name: decryptAES(rows[0].name),
          email: decryptAES(rows[0].email),
        });
      }
    );
  });
  app.get("/v2", async (req, res) => {
    const refreshToken = req.body.r_t;
    const accessToken = req.body.a_t;
    if (refreshToken == null) return res.sendStatus(403);

    db.query(
      "SELECT * FROM user_token WHERE r_token = ? AND a_token = ?",
      [refreshToken, accessToken],
      async (err, rows) => {
        if (err) {
          res.sendStatus(500);
          return console.error(err);
        }
        if (rows.length < 1) return res.sendStatus(403);

        if (!verifyRefreshToken) return res.sendStatus(403);
        const test = await fs.readFileSync(
          path.join(__dirname, "..", "jwtRS256-refresh.key.pub")
        );
        return jwtoken.verify(
          refreshToken,
          test.toString(),
          {
            algorithm: "RS256",
          },
          async (err, user) => {
            const newToken = await generateAccessToken({ token: user.token });
            db.query(
              "UPDATE user_token SET a_token = ? WHERE r_token = ?",
              [newToken, refreshToken],
              (err, rows) => {
                if (err) {
                  res.sendStatus(500);
                  return console.error(err);
                }
                res.json({ at: newToken });
              }
            );
          }
        );
      }
    );
  });
  app.post("/login", async (req, res) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const value = await schema.validate({
      email: req.body.email,
      password: req.body.password,
    });

    const cryptedEmail = await cryptAES(value.value.email);
    const pwd = await db.query("SELECT * FROM user WHERE email = ?", [
      cryptedEmail,
    ]);

    if (pwd.length < 1) return res.sendStatus(404);
    if (await ShaDecrypt(value.value.password, pwd[0].password)) {
      const token = crypto.randomBytes(512).toString("hex");

      const aToken = (await generateAccessToken({ token: token })).toString();
      const rToken = (await generateRefreshToken({ token: token })).toString();

      await db.query("DELETE FROM user_token WHERE user_id = ?", [pwd[0].id]);
      db.query(
        "INSERT INTO user_token (user_id, a_token, r_token) VALUES (?, ?, ?)",
        [pwd[0].id, aToken, rToken]
      );

      db.query("UPDATE user SET token = ? WHERE id = ?", [token, pwd[0].id]);

      res.json({
        email: decryptAES(pwd[0].email),
        name: decryptAES(pwd[0].name),
        at: aToken,
        rt: rToken,
      });
    } else {
      res.sendStatus(403);
    }
  });
};
