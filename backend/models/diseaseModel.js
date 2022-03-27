const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Disease already exist"],
    required: [true, "Please Enter disease Name"],
    trim: true,
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

module.exports = mongoose.model("Disease", diseaseSchema);
