const Zone = require("../models/zoneModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Zone -- Admin
exports.createZone = catchAsyncErrors(async (req, res, next) => {


  const zone = await Zone.create(req.body);

  res.status(201).json({
    success: true,
    zone,
  });
});

// Get All Zones
exports.getAllZones = catchAsyncErrors(async (req, res, next) => {
  const zones = await Zone.find();

  res.status(200).json({
    success: true,
    zones,
  });
});

// Get All Zones (Admin)
exports.getAdminZones = catchAsyncErrors(async (req, res, next) => {
  const zones = await Zone.find();

  res.status(200).json({
    success: true,
    zones,
  });
});

// Get Zone Details
exports.getZoneDetails = catchAsyncErrors(async (req, res, next) => {
  const zone = await Zone.findById(req.params.id);

  if (!zone) {
    return next(new ErrorHander("Zone not found", 404));
  }

  res.status(200).json({
    success: true,
    zone,
  });
});

// Update Zone -- Admin

exports.updateZone = catchAsyncErrors(async (req, res, next) => {
  let zone = await Zone.findById(req.params.id);

  if (!zone) {
    return next(new ErrorHander("Zone not found", 404));
  }


  zone = await Zone.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    zone,
  });
});

// Delete Zone

exports.deleteZone = catchAsyncErrors(async (req, res, next) => {
  const zone = await Zone.findById(req.params.id);

  if (!zone) {
    return next(new ErrorHander("Zone not found", 404));
  }

  await zone.remove();

  res.status(200).json({
    success: true,
    message: "Zone Delete Successfully",
  });
});

