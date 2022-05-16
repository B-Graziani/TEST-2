const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize("test_alone", "root", "root", {
    port: 8889,
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    logging: true,
  });
} else {
  sequelize = new Sequelize("test_alone", "root", "root", {
    port: 8889,
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    logging: true,
  });
}

sequelize
  .authenticate()
  .then(() => {
    console.log("connexion etablis !");
  })
  .catch((error) => {
    console.log(error);
  });

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

sequelize
  .sync({ force: true })
  .then(() => console.log("creation des tables , ok !"))
  .catch((error) => {
    console.log(error);
  });

module.exports = {
  Pokemon,
  User,
};
