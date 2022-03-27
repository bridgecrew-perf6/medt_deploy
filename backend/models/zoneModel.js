const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Zone already exist"],
    required: [true, "Please Enter zone Name"],
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

module.exports = mongoose.model("Zone", zoneSchema);
