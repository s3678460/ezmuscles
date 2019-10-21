const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const key = require("../../config/keys");
const passport = require("passport");
const randomstring = require("randomstring");
const joi = require("joi");


const mailer = require("../misc/mailer");

const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

// Load User Model
const User = require("../../models/User");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateTokenInput = require("../../validation/token-verification");

// @route  GET api/users
// @desc   GET ALL USERS
// @access Public
router.get("/", (req, res) => {
  User.find().then(users => res.json(users));
});

// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route  GET api/users/register
// @desc   Register User
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const result = joi.validate(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Generate Secret Token
  const secretToken = randomstring.generate(8);
  result.value.secretToken = secretToken;

  const html = `Hi there,
      <br/>
      
      YOU ARE ON THE WAY!
      Thank you for registering!
      <br/><br/>
      Please verify your email by typing the following token:
      <br/>
      Token: <b>${secretToken}<b/>
      <br/>
      On the following page:
      <a href="http://www.theezmuscle.com/verify">https://theezmuscle.com/verify</a>
      <br/>
      <br/>
      Have a good day!
      `;

  // HTML Mailing Body

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        secretToken: req.body.secretToken,
        active: req.body.active
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));

          // Send an email
          mailer.sendEmail(
            "admin@ezmuscles.com",
            newUser.email,
            "Welcome To EzMuscles! Confirmation Your Email Account",
            html
          );
        });
      });
    }
  });
});

// @route  GET api/users/login
// @desc   Login User / Returning JWT Token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  const active = req.body.active;

  // Find user by email
  User.findOne({ email: req.body.email }).then(user => {
    // Check user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    if (!user.active) {
      errors.email = "You have to verify first";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Password Matched

        const payload = { id: user.id, name: user.name }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          key.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route  GET api/users/current
// @desc   Return current user
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

router.post("/verify", (req, res) => {
  const secretToken = req.body.secretToken;
  const active = req.body.active;
  const { errors, isValid } = validateTokenInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = User.findOne({ secretToken: secretToken }).then(user => {
    if (!user) {
      errors.secretToken = "Confirmation code is not working";
      return res.status(400).json(errors);
    } else {
      user.active = true;
      user.secretToken = "";
      user.save();
      res.json("Verify Successfull");
    }
  });
});

router.post("/sendsms", (req,res) => {
  const phoneNumber = req.body.phoneNumber;
  const discountCode = randomstring.generate(8);
  

  client.messages.create({
    body: `This is EzMuscles! Your Discount Code Is: ${discountCode}. Please go to the closest retail store to use it`,
     from: '+19073181719',
     to: `+${phoneNumber}`
  })
  return res.json("Send Successfull");


});

module.exports = router;
