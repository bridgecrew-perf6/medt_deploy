const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.ObjectId,
    ref: "OrderId",
    required: true,
  },
  catId: {
    type: mongoose.Schema.ObjectId,
    ref: "CatId",
    // required: true,
  },
  itemId: {
    type: mongoose.Schema.ObjectId,
    ref: "ItemId",
  },
  catName: {
    type: String,
  },
  itemName: {
    type: String,
    // required: true,
  },

  qty: {
    type: Number,
    // required: true,
  },

  totalAmount: {
    type: Number,
    // required: true,
    default: 0,
  },

  description: {
    type: String,
    // required: true,
  },

  packSize: {
    type: Number,
    // required: true,
    default: 0,
  },

//   image: {
//     type: String,
//     // required: true,
//     default: 0,
//   },

  mrp: {
    type: Number,
    // required: true,
    default: 0,
  },
  totalMrp: {
    type: Number,
    // required: true,
    default: 0,
  },
  price: {
    type: Number,
    // required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    // required: true,
    default: 0,
  },

  discount: {
    type: Number,
    // required: true,
    default: 0,
  },

  brand: {
    type: String,
    // required: true,
  },

  status: {
    type: Number,
    // required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
