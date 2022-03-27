const mongoose = require("mongoose");

const devicePriceSchema = mongoose.Schema({
  deviceId: {
    type: mongoose.Schema.ObjectId,
  },
  zoneId: {
    type: mongoose.Schema.ObjectId,
  },
  price: {
    type: Number,
    required: [true, "Please enter devices price"],
  },
  mrp: {
    type: Number,
    required: [true, "Please enter devices mrp"],
  },
  stocks: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  hot: {
    type: Boolean,
    default: false,
  },
  trending: {
    type: Boolean,
    default: false,
  },
  offers: {
    type: Number,
    default: 0,
  },
  discounts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DevicePrice", devicePriceSchema);
