//CE DONT J AI BESOINS
const express = require("express");
//
//DEBUT DE L APP
const app = express();
const port = 3000;
//
//HOME PAR DEFAULT
app.get("/", (req, res) => {
  res.json("TEST HOME PAGE DEFAULT");
});
//
//FIN DE L APP
app.listen(port, () => {
  console.log(`app started with the port : ${port}`);
});
