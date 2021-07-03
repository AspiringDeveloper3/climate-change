const express = require("express");
const ejs = require("ejs");
const fetch = require("node-fetch");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server running!");
});

app.get("/", (req, res) => {
  let articles;
  var url =
    "https://newsapi.org/v2/everything?" +
    "domains=bbc.co.uk&"+
    "pageSize=7&"+
    "qInTitle=Climate&"+
    "from=2021-06-14&" +
    "sortBy=popularity&" +
    "apiKey=2ffc2bbd13d54f99829fc564b3b186a5";

  fetch(url).then(function (response) {
    response
      .json()
      .then((data) => {
        articles = data;
      })
      .then(() => {
        res.render("home", { articles: articles.articles });
      });
  });
});
