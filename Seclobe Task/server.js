const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/conncet.js");
const router = require("./router/route.js");

const app = express();
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running");
  });
});
