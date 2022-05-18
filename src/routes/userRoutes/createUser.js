const { User } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.post("/api/user", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    bcrypt
      .hash(password, 10)
      .then((hash) => User.create({ username: username, password: hash }))
      .then((user) => {
        const mess = `le user ${user.username} à bien ete creer !`;
        res.json({ mess, data: user });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.statut(400).json({ message: error.message, data: error });
        }
        const message = "le user n a pas pu etre creer , try again";
        res.statut(500).json({ message, data, error });
      });
  });
};
