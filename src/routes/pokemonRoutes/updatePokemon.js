const { Pokemon } = require("../../db/sequelize");
const pokemon = require("../../models/pokemon");

module.exports = (app) => {
  app.put("/api/pokemon/:id", (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id },
    }).then(() => {
      return Pokemon.findByPk(id).then((pokemon) => {
        const mess = `le pokemon ${pokemon.name} à bien ete modifié !`;
        res.json({ mess, data: pokemon });
      });
    });
  });
};
