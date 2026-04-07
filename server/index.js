// server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// OR allow only your frontend domain
app.use(
  cors({
    origin:
      "https://task-management-system-q6y1-git-main-vedants-projects-8304a44c.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// .connect("mongodb://localhost:27017/taskManagement")
// mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB Connected"));
// app.use(helmet());
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB Connected"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/task", require("./routes/taskRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running", PORT));
