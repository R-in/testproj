const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Employer = require("../../models/Employer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");

//@route    GET api/auth
//@desc     Test Route
//@access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
router.post(
  "/",
  [
    check("email", "Please enter valid email").isEmail(),
    check("password", "Password is Required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({
            errors: [
              {
                msg: "Invalid Credentials, if not an user, Sign up to create account ",
              },
            ],
          });
      }

      //match the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send(" Server Error");
    }
  }
);

//@route    POST api/auth
//@desc     Authenticate employee & get token
//@access   Public
router.post(
  "/",
  [
    check("email", "Please enter valid email").isEmail(),
    check("password", "Password is Required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let employer = await Employer.findOne({ email });

      if (!employer) {
        return res
          .status(400)
          .json({
            errors: [
              {
                msg: "Invalid Credentials, if not an user, Sign up to create account ",
              },
            ],
          });
      }

      //match the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        employer: {
          id: employer.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send(" Server Error");
    }
  }
);




module.exports = router;