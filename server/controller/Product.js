const { authenticateToken } = require("../Auth/Auth");
const multer = require("multer");
module.exports = async (app, db) => {
  app.get("/produk", async (req, res) => {
    const limit = req.query.limit || null;
    db.query(
      `SELECT * FROM product ORDER BY id DESC ${
        limit != null ? "LIMIT " + limit : ""
      }`,
      (err, rows) => {
        if (err) {
          console.log(err);
        }
        return res.json(rows);
      }
    );
  });

  app.post("/produkInfo", (req, res) => {
    const title = req.body.title;
    db.query(
      "SELECT p.name as produk_nama, p.description, p.id as produk_id, p.brand, p.price, p.qty, p.weight, p.image, c.id as category_id, c.name as category FROM product p INNER JOIN category c ON p.category_id = c.id WHERE p.name = ?",
      [title],
      (err, rows) => {
        if (err) {
          console.error(err);
          return res.sendstatus(500);
        }
        if (rows.length < 1) return res.sendStatus(404);
        res.json(rows[0]);
      }
    );
  });

  app.post("/addImageProduct", authenticateToken, async (req, res) => {
    let storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, "public/product-images");
      },
      filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    let upload = multer({ storage: storage }).single("file");

    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.sendStatus(500);
      } else if (err) {
        return res.sendStatus(500);
      }

      return res.json(req.file.filename);
    });
  });

  app.post("/addProduct", authenticateToken, async (req, res) => {
    const name = req.body.nama_produk;
    const description = req.body.deskripsi_produk;
    const image = req.body.image_produk;
    const price = req.body.price_produk;
    const qty = req.body.stock_produk;
    const brand = req.body.brand_produk;
    const weight = req.body.berat_produk;
    const category_id = req.body.kategori_produk;
    db.query(
      "INSERT INTO product (name, description, image, price, qty, brand, weight, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, description, image, price, qty, brand, weight, category_id],
      (err, rows) => {
        if (err) {
          res.sendStatus(500);
          return console.error(err);
        }
      }
    );
  });

  app.get("/kategori", (req, res) => {
    db.query("SELECT * FROM category", (err, rows) => {
      if (err) return res.sendStatus(500);

      res.json(rows);
    });
  });
};
