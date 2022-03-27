const mongoose = require("mongoose");

const drugCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Drug category already exist"],
    required: [true, "Please Enter drug category name"],
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

module.exports = mongoose.model("DrugCategory", drugCategorySchema);
