const { Pokemon } = require("../../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.put("/api/pokemon/:id", auth, (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then(() => {
        return Pokemon.findByPk(id).then((pokemon) => {
          if (pokemon === null) {
            const message = "le pokemon demandé n existe pas , try another id";
            return res.status(404).json({ message });
          }
          const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          // console.log(res);
          return res.status(400).json({ message: error.message, data: error });
        } else if (error instanceof UniqueConstraintError) {
          // console.log(res);
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = "le pokemon n a pas pu etre modifié , try again";
        res.status(500).json({ message, data, error });
      });
  });
};
