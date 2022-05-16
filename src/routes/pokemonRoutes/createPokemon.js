const { Pokemon } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/pokemon", (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const mess = `le pokemon ${pokemon.name} à bien ete creer !`;
        res.json({ mess, data: pokemon });
      })
      .catch(() => {
        console.log("ca n a pas fonctionner !");
      });
  });
};
