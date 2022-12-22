const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

let port = 3000;

if (process.env.PORT) {
  port = process.env.PORT;
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/browse", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  res.render("browse", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/index", function (req, res) {
  res.render("index");
});

app.get("/share", function (req, res) {
  res.render("share");
});

app.post("/share", function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
});

app.listen(port);
