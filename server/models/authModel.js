const mongoose = require("mongoose");
const authSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ["User", "Admin"], default: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Signup", authSchema);
