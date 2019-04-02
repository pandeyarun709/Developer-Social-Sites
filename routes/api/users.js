const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

//Load User Model
const User = require("../../models/User");

// @route   GET api/user/test
// @desc    Test user api
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "user test" }));

// @route   POST api/user/register
// @desc    Register user
// @access  public
router.post("/register", (req, res) => {
  //check email already exist or not
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exist" });
    } else {

      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating

        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      //Generating salt
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        //Hashing the password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/user/register
// @desc    Login user
// @access  public
router.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: "User not found!!" });
      }

      // check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            res.json({ msg: 'Success' });
          } else {
            return res.status(400).json({ msg: "password inccorrect" });
          }
        });
    });
});

module.exports = router;
