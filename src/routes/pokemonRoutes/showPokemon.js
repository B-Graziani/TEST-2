const { Pokemon } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemon/:id", (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        const mess = `le pokemon ${pokemon.name} à bien ete recuperer !`;
        res.json({ mess, data: pokemon });
      })
      .catch(() => {
        console.log("perdu");
      });
  });
};
