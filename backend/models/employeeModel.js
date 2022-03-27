const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },

  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: [true, "Email already Registered"],
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },

  phone: {
    type: String,
    required: [true, "Please Enter Your Phone Number"],
    minLength: [10, "Please Enter a valid Mobile Number"],
  },

  altPhone: {
    type: String,
    minLength: [10, "Please Enter a valid Mobile Number"],
  },

  address: {
    type: String,
    required: [true, "Please Enter Your Address"],
  },

  addressProof: {
    type: String,
    required: [true, "Please select Address Proof"],
  },

  addressProofId: {
    type: String,
    required: [true, "Please Enter Your Address proof Id"],
  },

  zoneId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },

  status: {
    type: Boolean,
    default: true,
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },

  // avatar: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },
  roles: {
    zoneManager: {
      type: Boolean,
      default: false,
    },
    storeManager: {
      type: Boolean,
      default: false,
    },
    delivery: {
      type: Boolean,
      default: false,
    },
    dataEntry: {
      type: Boolean,
      default: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
employeeSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

employeeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
employeeSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to employeeSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Employee", employeeSchema);
