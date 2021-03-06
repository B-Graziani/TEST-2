const { Pokemon } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  app.post("/api/pokemon", (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.statut(400).json({ message: error.message, data: error });
        }
        const message = "le pokemon n a pas pu etre creer , try again";
        res.statut(500).json({ message, data, error });
      });
  });
};
