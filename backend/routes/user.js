const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/api/users/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(podaci => {
      res.status(201).json({
        poruka: 'User je kreiran',
        podaci: podaci
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });
});

router.post("/api/users/login", (req, res, next) => {
  let userZaVracanje;
  User.findOne({email: req.body.email}).then(user => {
    if(!user){
      return res.status(401).json({poruka: 'Autentikacija nije uspela'});
    }
    userZaVracanje = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(rezultat => {
    if(!rezultat){
      return res.status(401).json({poruka: 'Autentikacija nije uspela'});
    }
    const token = jwt.sign(
      {email: userZaVracanje.email, userId: userZaVracanje._id},
      'secret_this_should_be_very_long',
      {expiresIn: '1h'});
    res.status(200).json({
      token: token
    });
  }).catch(err => {
    return res.status(401).json({poruka: 'Autentikacija nije uspela'});
  });
});

module.exports = router;
