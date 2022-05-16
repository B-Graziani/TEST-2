const { Pokemon } = require("../../db/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;

      if (name.length < 2) {
        const message = "recherche trop courte";
        return res.status(400).json({ message });
      }
      return Pokemon.findAndCountAll({
        where: {
          name: {
            //'name' est la propriété du modele pokemon
            [Op.like]: `%${name}%`, // 'name ' est le criter de recherche
          },
        },
        order: ["name"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `il y a ${count} pokemons qui correspondent`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = "Liste des pokémons non recupere , try again";
          res.status(500).json({ message, data, error });
        });
    }
  });
};
