const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.query.auth;
    console.log(token);
    jwt.verify(token, 'secret_this_should_be_very_long');
    next();
  }catch (error) {
    res.status(401).json({poruka: 'Autentikacija nije uspesna!!!'});
  }
};
