const { Pokemon } = require("../../db/sequelize");
const { ValidationError } = require("sequelize");

module.exports = (app) => {
  app.delete("/api/pokemon/:id", (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
      if (pokemon === null) {
        const mess = "le pokemon n existe pas";
        return res.status(404).json({ mess });
      } else {
        const pokemonDeleted = pokemon;
        return Pokemon.destroy({
          where: { id: pokemon.id },
        })
          .then(() => {
            const mess = `le pokemon ${pokemonDeleted.id} a bien ete supprimé !`;
            res.json({ mess, data: pokemonDeleted });
          })
          .catch((error) => {
            if (error instanceof ValidationError) {
              res.status(400).json({ message: error.message, data: error });
            } else {
              const message = "le pokemon n exite pas !";
              res.statut(500).json({ message, data, error });
            }
          });
      }
    });
  });
};
