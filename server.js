// Require our dependencies
const express = require("express");
const budget = require("./models/budget.js");
// Initialize Express App
const app = express();

// Configure Application Settings

// configure port
const port = process.env.PORT;

// Cached Variables
let bankAccount = 0;

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
  for (i = 0; i < budget.length; i += 1) {
    bankAccount = parseInt(budget[i].amount) + bankAccount;
    console.log(bankAccount);
  }
  res.render("index.ejs", {
    budget,
    bankAccount,
  });
});

// New
app.get("/budgets/newItem", (req, res) => {
  res.render("./new.ejs");
});

// Create
app.post("/budgets", (req, res) => {
  // create new budget item
  budget.push(req.body);
  res.redirect("/budgets"); // send user back to budgets list
});

// Show
app.get("/budgets/:indexOfBudgetArray", (req, res) => {
  res.render("show.ejs", {
    budgetItem: budget[req.params.indexOfBudgetArray], // sending requested budget item object to show.ejs
  });
});

// Tell the app to listen for requests on port 3000
app.listen(3000, () => console.log("Express is listening"));
