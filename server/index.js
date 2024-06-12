const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydatabase",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

app.get("/items", (req, res) => {
  const sql = "SELECT * FROM items";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/items", (req, res) => {
  const sql = "INSERT INTO items SET ?";
  const newItem = { name: req.body.name };
  db.query(sql, newItem, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/items/:id", (req, res) => {
  const sql = "UPDATE items SET ? WHERE id = ?";
  const updatedItem = { name: req.body.name };
  db.query(sql, [updatedItem, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/items/:id", (req, res) => {
  const sql = "DELETE FROM items WHERE id = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
