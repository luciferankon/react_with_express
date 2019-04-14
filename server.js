const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ankan4you",
  database: "join_us"
});

connection.connect();

app.use(express.static("join-us-react/build"));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/count", (req, res) => {
  connection.query(
    "select ifnull(count(*),0) as total_users from users",
    (error, results, fields) => {
      if (error) throw error;
      res.send("" + results[0].total_users);
    }
  );
});

app.post("/join", (req, res) => {
  const { name } = req.body;
  const person = { name: name };
  connection.query("insert into users SET ?", person, (error, results) => {
    if (error) throw error;
  });
  res.redirect("/");
});
app.listen(8000);