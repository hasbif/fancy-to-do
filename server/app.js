const express = require("express");
const app = express();
require("dotenv").config();
const port = 3000;
const route = require("./routes");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", route);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
