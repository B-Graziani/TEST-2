const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then((user) => {
      if (!user) {
        const message = "l utilisateur renseigné n existe pas ";
        return res.status(404).json({ message });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = "le mot de passe renseigné est incorrect";
            return res.status(401).json({ message });
          } else {
            const message = "l utilisateur s est connecté avec succes !";
            return res.json({ message, data: user });
          }
        })
        .catch((error) => {
          message = "l utilisateur n a pas pu etre connecté, try again !";
          return res.json({ message, data: error });
        });
    });
  });
};
