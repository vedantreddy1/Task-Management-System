// server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(express.json());
// app.use(cors());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// OR allow only your frontend domain
const allowedOrigins = [
  "https://task-management-system-q6y1-git-main-vedants-projects-8304a44c.vercel.app",
  "https://task-management-system-q6y1-l94ykir9m-vedants-projects-8304a44c.vercel.app",
  
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
