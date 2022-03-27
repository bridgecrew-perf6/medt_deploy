const mongoose = require("mongoose");

const pinAmountSchema = new mongoose.Schema({
  zoneId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Please Enter pinAmount Name"],
  },

  city: {
    type: String,
    required: [true, "Please select city"],
  },

  pincode: {
    type: String,
    required: [true, "Please enter pincode"],
  },

  area: {
    type: String,
    required: [true, "Please enter area"],
  },

  deliveryCharge1: {
    type: Number,
    required: [true, "Please enter delivery charge1"],
  },

  amountRange1: {
    type: Number,
    required: [true, "Please enter amonut range1"],
  },

  deliveryCharge2: {
    type: Number,
    required: [true, "Please enter delivery charge2"],
  },

  amountRange2: {
    type: Number,
    required: [true, "Please enter amonut range2"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PinAmount", pinAmountSchema);
