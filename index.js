const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config();

const authApi = require("./api/auth");
const favoriteApi = require("./api/favorite");
const menuApi = require("./api/menu");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// route
app.use("/auth", authApi);
app.use("/favorite", favoriteApi);
app.use("/menu", menuApi);

app.listen(3001, ()=>console.log("listening at http://localhost:3001"));