const express = require("express");
const mysql = require("mysql");
const path = require('path')
const dotenv = require("dotenv");
const exp = require("constants");

const app = express();

dotenv.config({ path: './.env'})

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.DATABASE
});

app.set('view engine','hbs');

const publicDirectory = path.join(__dirname,'./')

app.use(express.static(publicDirectory))
// console.log(__dirname)

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mysql Database Connected");
  }
});

app.get("/",(req,res) => {
  res.send("<h1>Hello World</h1>")
  res.render("index");
})

app.listen(5002, () => {
  console.log("Server started on port 5001");
});
