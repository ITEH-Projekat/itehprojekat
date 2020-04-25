const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nekretnineRoutes = require("./routes/nekretnine");
const userRoutes = require("./routes/user");

mongoose.connect("mongodb://localhost/itehprojekat", {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database!');
  }).catch(() => {
    console.log('Connection failed!');
});

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.use(nekretnineRoutes);
app.use(userRoutes);
module.exports = app;
