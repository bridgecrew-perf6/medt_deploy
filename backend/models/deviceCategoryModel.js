const mongoose = require("mongoose");

const deviceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Device category already exist"],
    required: [true, "Please Enter device category Name"],
    trim: true,
  },

  // thumbnail: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },

  status: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DeviceCategory", deviceCategorySchema);
