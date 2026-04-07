const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "in-progress"],
  },
  assignTo: { type: mongoose.Schema.Types.ObjectId, ref: "Signup" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Signup" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Signup" },
},{timestamps:true});

module.exports = mongoose.model("Tasks",taskSchema)