const { User } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/user", (req, res) => {
    User.create(req.body)
      .then((user) => {
        const mess = `le user ${user.username} à bien ete creer !`;
        res.json({ mess, data: user });
      })
      .catch(() => {
        console.log("ca n a pas fonctionner !");
      });
  });
};
