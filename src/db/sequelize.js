const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("test_alone", "root", "root", {
  port: 8889,
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connexion etablis !");
  })
  .catch((error) => {
    console.log(error);
  });
