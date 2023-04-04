const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config();

const authApi = require("./api/auth");
const favoriteApi = require("./api/favorite");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// route
app.use("/auth", authApi);
app.use("/favorite", favoriteApi);

app.listen(3000, ()=>console.log("listening at http://localhost:3000"));