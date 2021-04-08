module.exports = (app, db) => {
  app.get("/hello", async (req, res) => {
    res.json({ message: "Hellso World!" });
  });
};
