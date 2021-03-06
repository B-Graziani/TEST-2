const { Pokemon } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemon/:id", (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message = "le pokemon demandé n existe pas , try another id";
          return res.status(404).json({ message });
        }
        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message = "Liste des pokémons non recupere , try again";
        res.status(500).json({ message, data, error });
      });
  });
};
