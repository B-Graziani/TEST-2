//CE DONT J AI BESOINS
const express = require("express");
const bodyParser = require("body-parser");
//JE SAIS QUE LA CONNEXION FONCTIONNE
// const sequelize = require("./src/db/sequelize");
//
//DEBUT DE L APP
const app = express();
const port = process.env.PORT || 3000;
//
//MIDDLEWARE
app.use(bodyParser.json());
//
//HOME PAR DEFAULT (route)
app.get("/", (req, res) => {
  res.json("TEST HOME PAGE DEFAULT");
});

require("./src/routes/pokemonRoutes/createPokemon")(app);
require("./src/routes/pokemonRoutes/findAllPokemons")(app);
require("./src/routes/userRoutes/createUser")(app);

//FIN DE L APP
app.listen(port, () => {
  console.log(`app started with the port : ${port}`);
});
