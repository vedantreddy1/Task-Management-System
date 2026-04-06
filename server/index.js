// server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// .connect("mongodb://localhost:27017/taskManagement")
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB Connected"));
// app.use(helmet());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/task", require("./routes/taskRoute"));


const PORT = process.env.PORT||5000 ;

app.listen(PORT, () => console.log("Server running",PORT));
