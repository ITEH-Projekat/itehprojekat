const express = require('express');
const bodyParser = require('body-parser');
const Nekretnina = require('./models/nekretnina');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/itehprojekat")
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
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.get("/api/nekretnine", (req, res, next)=>{
  Nekretnina.find().then(documents => {
    res.status(200).json({
      message: 'Uspesno!',
      nekretnine: documents
    });
  });
});

app.post("/api/nekretnine", (req, res, next) => {
  const nekretnina = new Nekretnina({
    naslov: req.body.naslov,
    opis: req.body.opis,
    kvadratura: req.body.kvadratura,
    cena: req.body.cena,
    slika: req.body.slika
  });
  console.log(nekretnina);
  nekretnina.save().then(result => {
    res.status(201).json({
      message: 'Nekretnina dodata u bazu!',
      nekrId: result._id
    });
  });
  // next();
});

module.exports = app;
