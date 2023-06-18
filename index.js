const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const connection = require("./config/db");
const { userrouter } = require("./models/userRoute");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(" Welcome To The Home page");
});

app.use("/user", userrouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server runs at  ${process.env.PORT}`);
  try {
    await connection;
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
});
