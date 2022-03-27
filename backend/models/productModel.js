const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter products name"],
  },
  zoneId: {
    type: mongoose.Schema.ObjectId,
    ref: "ZoneId",
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Categopry",
    required: [true, "Please select products category"],
  },
  categoryName: String,
  keywords: {
    type: String,
    required: [true, "Please enter keywords"],
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
  },
  packSize: {
    type: Number,
    // required: [true, "Please enter company"],
  },
  type: {
    type: Number,
    // required: [true, "Please enter company"],
  },
  options: {
    type: Number,
    // required: [true, "Please enter company"],
  },
  brand: {
    type: String,
    // required: [true, "Please enter company"],
  },
  ingredients: {
    type: String,
    // required: [true, "Please enter company"],
  },
  productInfo: {
    type: String,
    // required: [true, "Please enter company"],
  },
  otherDetails: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  metaKeywords: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  slugUrl: {
    type: String,
  },
  hot: {
    type: Boolean,
    default: false,
  },
  trending: {
    type: Boolean,
    default: false,
  },

  deskImg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  mobileImg: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },

  sliderImages: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
  ],

  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
