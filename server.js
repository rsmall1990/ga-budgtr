// Require our dependencies
const express = require("express");
const budget = require("./models/budget.js");
// Initialize Express App
const app = express();

// Configure Application Settings

// configure port
const port = process.env.PORT;

// Handle/connect to database

// Mount middleware
app.use(express.static("public"));

app.use(function (req, res, next) {
  console.log("I will run with each request");
  req.timeStamp = new Date();
  next();
});

app.use(express.urlencoded({ extended: false }));

// Mount routes

// Index

app.get("/budgets", (req, res) => {
  res.render("index.ejs", {
    budget,
  });
});

// Tell the app to listen for requests on port 3000
app.listen(3000, () => console.log("Express is listening"));
