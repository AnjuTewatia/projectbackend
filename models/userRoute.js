const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { userModel } = require("./userModel");
const userrouter = express.Router();

userrouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, +process.env.salt, async function (err, hash) {
      if (err) {
        console.error(err);
        res.status(500).send({ err: "Something went wrong" });
      } else {
        const user = new userModel({ email, password: hash });
        await user.save();
        res.status(201).send({ msg: "User Registered Successfully", user });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ err: "Something went wrong" });
  }
});

// Login Users
userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user._id }, process.env.secret);
          res.send({ msg: "Login Successfull", user, token });
        } else {
          res.send({ err: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ err: "User Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ err: "Something went wrong" });
  }
});

module.exports = { userrouter };
