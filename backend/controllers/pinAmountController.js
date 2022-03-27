const PinAmount = require("../models/pinAmountModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create PinAmount -- Admin
exports.createPinAmount = catchAsyncErrors(async (req, res, next) => {
  const pinAmount = await PinAmount.create(req.body);

  res.status(201).json({
    success: true,
    pinAmount,
  });
});

//Get All PinAmount
exports.getAllPinAmounts = catchAsyncErrors(async (req, res, next) => {
    const pinAmounts = await PinAmount.find();

  res.status(200).json({
    success: true,
    pinAmounts,
  });
});

// Get PinAmount Details
exports.getPinAmountDetails = catchAsyncErrors(async (req, res, next) => {
  const pinAmount = await PinAmount.findById(req.params.id);

  if (!pinAmount) {
    return next(new ErrorHander("PinAmount not found", 404));
  }

  res.status(200).json({
    success: true,
    pinAmount,
  });
});

// Update PinAmount -- Admin

exports.updatePinAmount = catchAsyncErrors(async (req, res, next) => {
  let pinAmount = await PinAmount.findById(req.params.id);

  if (!pinAmount) {
    return next(new ErrorHander("PinAmount not found", 404));
  }

  pinAmount = await PinAmount.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    pinAmount,
  });
});

// Delete PinAmount

exports.deletePinAmount = catchAsyncErrors(async (req, res, next) => {
  const pinAmount = await PinAmount.findById(req.params.id);

  if (!pinAmount) {
    return next(new ErrorHander("PinAmount not found", 404));
  }

  await pinAmount.remove();

  res.status(200).json({
    success: true,
    message: "PinAmount Delete Successfully",
  });
});
