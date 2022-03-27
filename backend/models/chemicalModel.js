const mongoose = require("mongoose");

const chemicalSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Chemical already exist"],
    required: [true, "Please Enter chemical Name"],
    trim: true,
  },

  drugCategory: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Please select drugs category"],
  },

  description: {
    type: String,
    trim: true,
  },

  status: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chemical", chemicalSchema);
