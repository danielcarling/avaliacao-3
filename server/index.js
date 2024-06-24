const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 5008;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "daniel",
  password: "123456",
  database: "mydatabase",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL");
});

app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      console.error("Erro ao buscar tasks:", err);
      res.status(500).send("Erro ao buscar tasks");
      return;
    }
    res.json(results);
  });
});

app.post("/tasks", (req, res) => {
  const { user_id, task } = req.body;
  db.query(
    "INSERT INTO tasks (user_id, task) VALUES (?, ?)",
    [user_id, task],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar task:", err);
        res.status(500).send("Erro ao criar task");
        return;
      }
      res.json({ id: results.insertId, user_id, task });
    }
  );
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { user_id, task } = req.body;
  db.query(
    "UPDATE tasks SET user_id = ?, task = ? WHERE id = ?",
    [user_id, task, id],
    (err) => {
      if (err) {
        console.error("Erro ao atualizar task:", err);
        res.status(500).send("Erro ao atualizar task");
        return;
      }
      res.sendStatus(200);
    }
  );
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Erro ao deletar task:", err);
      res.status(500).send("Erro ao deletar task");
      return;
    }
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
