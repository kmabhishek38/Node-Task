const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const userModel = require("../models/userModel"); 

async function register(req, res) {
  try {
    const specialchar = /[!@#$%^&*(),.?":{}|<>]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, password, confirmPassword } = req.body;
    if (!email) {
      return res.status(400).send({ error: "Please enter email" });
    } else if (!emailRegex.test(email)) {
      return res.status(400).send({ error: "Please enter a valid email" });
    }
    const existEmail = await userModel.findOne({ email });
    if (existEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    if (password) {
      if (!specialchar.test(password)) {
        return res.status(400).send({
          error: "Password should contain atleaset one special charector",
        });
      } else if (password.length < 6) {
        return res
          .status(400)
          .send({ error: "Password should be atleast 6 charectors" });
      }
      if (password === confirmPassword) {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
          email,
          password: hashPassword,
        });

        await user.save();

        return res
          .status(201)
          .send({ error: false, msg: "User registered successfully" });
      } else {
        return res
          .status(400)
          .send({ error: "Password and confirm password are not same" });
      }
    } else {
      return res.status(400).send({ error: "Password is required" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ error: "email should not be empty" });
    }
    if (!password) {
      return res.status(400).send({ error: "password should not be empty" });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({ error: "Password does not match" });
    }

    
    const token = Jwt.sign(
      {
        userid: user._id,
        email: user.email,
      },
      process.env.JWTS,
      { expiresIn: "30d" }
    );

    return res.status(200).send({
      msg: "Logged in successfully...",
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
 
module.exports = {
  register,
  login,
};
