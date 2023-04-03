const express = require("express");
const app = express();

require('dotenv').config();

const authApi = require("./api/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route
app.use("/auth", authApi);

app.listen(3000, ()=>console.log("listening at http://localhost:3000"));