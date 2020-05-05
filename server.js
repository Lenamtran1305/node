// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded

app.set("view engine", "pug");
app.set("views", "./views");
let list = [
  { id: 1, content: "Đi chợ" },
  { id: 2, content: "Nấu cơm" },
  { id: 3, content: "Rửa bát" },
  { id: 4, content: "Học code tại CodersX" }
];
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/todos", (req, res) => {
  let q = req.query.q;
  if (q) {
    let matchedTodos = list.filter(item => {
      return item.content.toLowerCase().indexOf(q.toLowerCase()) >= 0;
    });
    res.render("todos/index", {
      list: matchedTodos
    });
  }
  res.render("todos/index", {
    list: list
  });
});

app.get("/todos/create", (req, res) => {
  res.render("todos/create")
});

app.post("/todos/create", (req, res) => {
  list.push(req.body);
  res.redirect("/todos");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
