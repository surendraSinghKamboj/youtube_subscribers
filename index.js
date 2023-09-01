const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const port = 3000;

// Using Environment variables
dotenv.config({ path: "./config.env" });

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE

const DATABASE_URL = process.env.MONGO_URI;
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log("error"));
db.once("open", () => console.log("connected to database"));

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));
