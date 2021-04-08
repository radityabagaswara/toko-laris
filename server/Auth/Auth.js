const jwtoken = require("jsonwebtoken");
const con = require("../db");
const fs = require("fs");
var path = require("path");

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const key = await fs.readFileSync(
    path.join(__dirname, "..", "jwtRS256.key.pub")
  );

  jwtoken.verify(
    token,
    key.toString(),
    { algorithms: "RS256" },
    (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      let userID;
      con.query(
        "SELECT * FROM user_token WHERE a_token = ?",
        [token],
        (err, rows) => {
          if (err || rows.length < 1) return res.sendStatus(403);
          con.query(
            "SELECT * FROM user WHERE token = ?",
            [user.token],
            (err, rows) => {
              if (err || rows.length < 1) return res.sendStatus(403);

              req.user = user.token;
              req.userID = rows[0].id;
              next();
            }
          );
        }
      );
    }
  );
};
