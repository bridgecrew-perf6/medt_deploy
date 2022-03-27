const mongoose = require("mongoose");

const productPriceSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
  },
  zoneId: {
    type: mongoose.Schema.ObjectId,
  },
  price: {
    type: Number,
    required: [true, "Please enter selling price"],
  },
  mrp: {
    type: Number,
    required: [true, "Please enter product mrp"],
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

module.exports = mongoose.model("ProductPrice", productPriceSchema);
