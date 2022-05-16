const { Pokemon } = require("../../db/sequelize");

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
          .catch(() => {
            const mess = "erreur lors de la suppression !";
            res.status(400).json({ mess });
          });
      }
    });
  });
};
