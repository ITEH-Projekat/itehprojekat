const express = require("express");

const Nekretnina = require('../models/nekretnina');

const router = express.Router();

const proveriAuth = require("../middleware/proveri-auth");

router.get("/api/nekretnine", (req, res, next)=>{
  Nekretnina.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Uspesno!',
      nekretnine: documents
    });
  });
});

router.post("/api/nekretnine", proveriAuth, (req, res, next) => {
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

router.delete("/api/nekretnine/:id", proveriAuth, (req, res, next) => {
  Nekretnina.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Nekretnina deleted!'});
  });
});

router.get("/api/nekretnine/:id", (req, res, next) => {
  Nekretnina.findById(req.params.id).then(nekretnina => {
    if(nekretnina){
      res.status(200).json(nekretnina);
    }else{
      res.status(404).json({message: 'Page not found!'});
    }
  });
});

router.put("/api/nekretnine/:id", proveriAuth, (req, res, next) => {
  Nekretnina.updateOne({_id: req.body.id}, req.body).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'});
  });
});

module.exports = router;
