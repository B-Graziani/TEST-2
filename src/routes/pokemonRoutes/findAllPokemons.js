const { Pokemon } = require("../../db/sequelize");
const pokemon = require("../../models/pokemon");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    Pokemon.findAll()
      .then((pokemons) => {
        const mess = "Liste de pokemons recupere !";
        res.json({ mess, data: pokemons });
      })
      .catch(() => {
        console.log("perdu!");
      });
  });
};
