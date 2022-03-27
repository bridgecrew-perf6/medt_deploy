const mongoose = require("mongoose");

const drugSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter drugs name"],
  },
  zoneId: {
    type: mongoose.Schema.ObjectId,
    ref: "ZoneId",
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Categopry",
    required: [true, "Please select drugs category"],
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
  composition: {
    type: String,
    // required: [true, "Please enter composition"],
  },
  brand: {
    type: String,
    // required: [true, "Please enter brand"],
  },
  countryOfOrigin: {
    type: String,
    // required: [true, "Please enter country of origin"],
  },
  uses: {
    type: String,
    // required: [true, "Please enter uses"],
  },
  usesDirections: {
    type: String,
    // required: [true, "Please enter uses direction"],
  },
  commonSideEffects: {
    type: String,
  },
  seriousSideEffects: {
    type: String,
  },
  warningPrecautions: {
    type: String,
  },
  synopsis: {
    type: String,
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

  generic: {
    type: Boolean,
  },
  ratings: {
    type: Number,
    default: 0,
  },

  images: {
    deskImg: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    mobileImg: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
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

module.exports = mongoose.model("Drug", drugSchema);
