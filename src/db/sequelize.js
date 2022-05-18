const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
// const bcrypt = require("bcrypt");

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    "ifbptmf3mvx7acdd",
    "nzuke8xnf7es5cyr",
    "zxhgseq8z5p3gvpd",
    {
      host: "ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      dialect: "mariadb",
      dialectOptions: {
        timezone: "Etc/GMT-2",
      },
      logging: true,
    }
  );
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

const initDb = () => {
  return sequelize.sync({ force: true }).then(() => {
    // bcrypt.hash("motdepasse", 10).then((hash) => {
    //   User.create({
    //     username: "pikachu",
    //     password: hash,
    //   }).then((user) => user.toJSON());
    //   console.log("Base de donnée initialisée");
    // });
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
