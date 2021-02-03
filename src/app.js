const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");
const { sequelize } = require("./models");
const app = express();

app.use(cors());
app.use(bodyParser.json());

require("./router")(app);

sequelize.sync().then(() => {
  // sequelize.sync({ force: true }).then(() => {
  app.listen({ port: config.port });
  console.log(`Server started at port ${config.port}`);
});
