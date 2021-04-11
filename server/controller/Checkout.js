const { IoFunnelSharp } = require("react-icons/io5");
const { authenticateToken } = require("../Auth/Auth");
const cryptojs = require("crypto-js");
const cryptAES = require("../lib/cryptAES");

module.exports = async (app, db) => {
  app.post("/checkout", authenticateToken, async (req, res) => {
    const user = req.userID;
    const product = req.body.produk;
    const credit = await cryptojs.AES.decrypt(
      req.body.credit,
      "7zEp$Cj3o4K556Rm"
    ).toString();

    const credit_enc = await cryptAES(credit);

    const transId = await db.query(
      "INSERT INTO transaction (status, user_id, payment_method, shipping, credit_card) VALUES (?, ?, ?, ?, ?)",
      [1, user, "Uang Gaib", "JEN", credit_enc]
    );

    product.forEach((e) => {
      db.query(
        "INSERT INTO product_transaction (idtransaction, idproduct, qty, price) VALUES (?, ?, ?, ?)",
        [transId.insertId, e.id, e.qty, e.price]
      );
    });
    return res.sendStatus(200);
  });

  app.get("/checkoutHistory", authenticateToken, async (req, res) => {
    const user = req.userID;

    db.query(
      `SELECT t.id, t.payment_method, t.shipping, t.date, 
      (SELECT COUNT(*) FROM product_transaction WHERE idtransaction = t.id) as item_count FROM transaction t WHERE t.user_id = ?`,
      [user],
      (err, rows) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }

        res.json(rows);
      }
    );
  });

  app.get("/checkouthistoryitem", authenticateToken, async (req, res) => {
    const user = req.userID;
    const transId = req.query.id;

    db.query(
      "SELECT p.name as product, p.description, p.image, t.price as price, t.qty as qty FROM product p INNER JOIN product_transaction t ON p.id = t.idproduct WHERE t.idtransaction = ?",
      [transId],
      (err, rows) => {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        }

        res.json(rows);
      }
    );
  });
};
