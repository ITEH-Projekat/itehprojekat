const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");

});

app.get("/api/nekretnine", (req, res, next)=>{
  const nekretnine = [
    {
      id: 'dsfdsfds',
      naslov: 'Stan broj 1',
      opis: 'Veoma lep stan na veoma dobroj lokaciji. Vredi pogledati!',
      kvadratura: 55,
      cena: 12100,
      slika: 'https://foxnekretnine.com/slike/6697311.jpg'
    },
    {
      id: 'yuyhyhy',
      naslov: 'Stan broj 2',
      opis: 'Veoma lep stan na veoma dobroj lokaciji. Vredi pogledati!',
      kvadratura: 55,
      cena: 64500,
      slika: 'https://garsonjere-kragujevac.rs/images/blog/povoljni-stanovi-za-izdavanje-kragujevac-velika-4abdc74095.jpg'
    },
    {
      id: 'hgbgfb',
      naslov: 'Stan broj 3',
      opis: 'Veoma lep stan na veoma dobroj lokaciji. Vredi pogledati!',
      kvadratura: 57,
      cena: 77000,
      slika: 'https://cityexpert.rs/blog/sites/default/files/slika/pet-friendly-stanovi-za-idavanje.jpg'
    }
  ];
  res.status(200).json({
    message: 'Uspesno!',
    nekretnine: nekretnine
  });
});

module.exports = app;
