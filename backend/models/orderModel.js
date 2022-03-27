const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  zoneId: {
    type: mongoose.Schema.ObjectId,
    ref: "ZoneId",
    required: true,
  },

  orderDetails: String,

  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  netPayable: {
    type: Number,
    // // required: true,
    default: 0,
  },
  couponDis: {
    type: Number,
    // // required: true,
    default: 0,
  },
  deliverCharge: {
    type: Number,
    // // required: true,
    default: 0,
  },
  saving: {
    type: Number,
    // // required: true,
    default: 0,
  },
  cashback: {
    type: Number,
    // // required: true,
    default: 0,
  },

  itemCount: {
    type: Number,
    // // required: true,
    default: 0,
  },
  packCount: {
    type: Number,
    // // required: true,
    default: 0,
  },


  orderStatus: {
    type: Number,
    // // required: true,
    default: 1,
  },
  statusText: {
    type: String,
    // // required: true,
    default: "Order Recieved",
  },

  // Shipping Information
  shippingInfo: {
    address: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    pinCode: {
      type: Number,
      // required: true,
    },
    phoneNo: {
      type: Number,
      // required: true,
    },
  },

  // Client Information
  clientInfo: {
    id: {
      type: mongoose.Schema.ObjectId,
      // required: true,
    },
    name: {
      type: String,
    },
  },

  // Payment Information
  paymentInfo: {
    id: {
      type: String,
      // // required: true,
    },
    mode: {
      type: String,
      // // required: true,
    },
    status: {
      type: String,
      // // required: true,
    },
    paidAt: Date,
  },

  // Delivery Information
  deliveryInfo: {
    deliveryManId: {
      type: mongoose.Schema.ObjectId,
      // required: true,
    },
    deliveryManName: {
      type: String,
      // required: true,
    },
    deliveryManPhone: {
      type: Number,
      // required: true,
    },
  },

  // Coupon Information
  couponInfo: {
    couponId: {
      type: mongoose.Schema.ObjectId,
      ref: "Coupon",
      // required: true,
    },
    couponCode: {
      type: String,
    },
    couponTitle: {
      type: String,
    },
    couponDescription: {
      type: String,
    },
  },

  expectedDelDate: Date,
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
