const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Employe = require("../../models/Employer");
const Employer = require("../../models/Employer");


//@route    POST api/employe
//@desc     Register Route
//@access   Public
router.post(
    "/",
    [
      check("name", "Name is Required").not().isEmpty(),
      check("email", "Please enter valid email").isEmail(),
      check("password", "Ener Min 8 charaters").isLength({ min: 8 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, password } = req.body;
  
      try {
        let employer = await Employer.findOne({ email });
  
        if (employe) {
          res.status(400).json({ errors: [{ msg: "Employer Already Exists " }] });
        }
  
  
        employer = new Employer({
          name,
          email,
          password,
        });
  
        const salt = await bcrypt.genSalt(10);
  
        employer.password = await bcrypt.hash(password, salt);
  
        await employer.save();
  
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