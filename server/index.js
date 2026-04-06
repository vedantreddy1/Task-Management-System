// server.js

// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const helmet = require("helmet");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

mongoose
  .connect("mongodb://localhost:27017/taskManagement")
  .then(() => console.log("DB Connected"));
// app.use(helmet());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/task", require("./routes/taskRoute"));



app.listen(5000, () => console.log("Server running"));
