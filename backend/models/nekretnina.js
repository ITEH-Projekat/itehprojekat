const mongoose = require('mongoose');

const nekretninaSchema = mongoose.Schema({
  naslov: String,
  opis: String,
  kvadratura: Number,
  cena: Number,
  slika: String
});

module.exports = mongoose.model("Nekretnina", nekretninaSchema);
