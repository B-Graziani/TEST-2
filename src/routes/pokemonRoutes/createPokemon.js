const { Pokemon } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  app.post("/api/pokemon", (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const mess = `le pokemon ${pokemon.name} à bien ete creer !`;
        res.json({ mess, data: pokemon });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        } else {
          const message = "le pokemon n a pas pu etre creer !";
          res.statut(500).json({ message, data, error });
        }
      });
  });
};
