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
  }).catch(error => {
    res.status(500).json({
      message: "Neuspesno povlacenje nekretnina"
    })
  });;
});

router.post("/api/nekretnine/pretraga", (req, res, next) => {
  const parametri = req.body.valueParametri;
  let kvOd = parametri.kvadraturaOd;
  let kvDo = parametri.kvadraturaDo;
  let cenaOd = parametri.cenaOd;
  let cenaDo = parametri.cenaDo;
  let query = {};

  if (cenaOd && cenaDo){
    query.cena = {$gte: +cenaOd, $lte: +cenaDo};
  }else{
    if (cenaOd) query.cena = {$gte: +cenaOd};
    if (cenaDo) query.cena = {$lte: +cenaDo};
  }

  if (kvOd && kvDo){
    query.kvadratura = {$gte: +kvOd, $lte: +kvDo};
  }else{
    if (kvOd) query.kvadratura = {$gte: +kvOd};
    if (kvDo) query.kvadratura = {$lte: +kvDo};
  }

  Nekretnina.find(query).then(nekretnine => {
    // console.log(nekretnine);
    res.status(200).json({
      nekretnine: nekretnine,
      poruka: "Uspesna pretraga"
    });
  });
});

router.post("/api/nekretnine", proveriAuth, (req, res, next) => {
  const nekretnina = new Nekretnina({
    naslov: req.body.naslov,
    opis: req.body.opis,
    kvadratura: req.body.kvadratura,
    cena: req.body.cena,
    slika: req.body.slika,
    user: req.userData.userId
  });
  console.log(nekretnina);
  nekretnina.save().then(result => {
    res.status(201).json({
      message: 'Nekretnina dodata u bazu!',
      nekrId: result._id
    });
  }).catch(error => {
    res.status(500).json({
      message: "Kreiranje oglasa neuspesno"
    })
  });
  // next();
});

router.delete("/api/nekretnine/:id", proveriAuth, (req, res, next) => {
  Nekretnina.deleteOne({_id: req.params.id, user: req.userData.userId}).then(result => {
    console.log(result);
    if(result.n > 0) {
      res.status(200).json({message: 'Deletion successful!'});
    } else {
      res.status(401).json({message: 'Not authorized!'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Greska u brisanju nekretnine"
    })
  });;
});

router.get("/api/nekretnine/:id", (req, res, next) => {
  Nekretnina.findById(req.params.id).then(nekretnina => {
    if(nekretnina){
      res.status(200).json(nekretnina);
    }else{
      res.status(404).json({message: 'Page not found!'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Povlacenje jednog posta neuspesno"
    })
  });;
});

router.put("/api/nekretnine/:id", proveriAuth, (req, res, next) => {
  Nekretnina.updateOne({_id: req.body.id, user: req.userData.userId}, req.body).then(result => {
    console.log(result);
    if(result.nModified > 0) {
      res.status(200).json({message: 'Update successful!'});
    } else {
      res.status(401).json({message: 'Not authorized!'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Izmena neuspesna"
    })
  });
});

module.exports = router;
