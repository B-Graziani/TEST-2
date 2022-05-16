const { Pokemon } = require("../../db/sequelize");
// const pokemon = require("../../models/pokemon");

module.exports = (app) => {
  app.post("/api/pokemons", (req, res) => {
    Pokemon.create(req.body).then((pokemon) => {
      const message = `le pokemon ${pokemon.name} a bien ete creeer`;
      res.json({ message, data: pokemon });
    });
  });
};
