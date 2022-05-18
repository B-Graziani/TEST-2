const { User } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  app.post("/api/user", (req, res) => {
    User.create(req.body)
      .then((user) => {
        const mess = `le user ${user.username} à bien ete creer !`;
        res.json({ mess, data: user });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.statut(400).json({ message: error.message, data: error });
        }
        const message = "le user n a pas pu etre creer , try again";
        res.statut(500).json({ message, data, error });
      });
  });
};
