const DeviceCategory = require("../models/deviceCategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create DeviceCategory -- Admin
exports.createDeviceCategory = catchAsyncErrors(async (req, res, next) => {
  const deviceCategory = await DeviceCategory.create(req.body);

  res.status(201).json({
    success: true,
    deviceCategory,
  });
});

// Get All DeviceCategory
exports.getAllDeviceCategorys = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    deviceCategorys,
  });
});

// Get All DeviceCategory (Admin)
exports.getAdminDeviceCategorys = catchAsyncErrors(async (req, res, next) => {
  const deviceCategorys = await DeviceCategory.find();

  res.status(200).json({
    success: true,
    deviceCategorys,
  });
});

// Get DeviceCategory Details
exports.getDeviceCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const deviceCategory = await DeviceCategory.findById(req.params.id);

  if (!deviceCategory) {
    return next(new ErrorHander("DeviceCategory not found", 404));
  }

  res.status(200).json({
    success: true,
    deviceCategory,
  });
});

// Update DeviceCategory -- Admin

exports.updateDeviceCategory = catchAsyncErrors(async (req, res, next) => {
  let deviceCategory = await DeviceCategory.findById(req.params.id);

  if (!deviceCategory) {
    return next(new ErrorHander("DeviceCategory not found", 404));
  }

  deviceCategory = await DeviceCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    deviceCategory,
  });
});

// Delete DeviceCategory

exports.deleteDeviceCategory = catchAsyncErrors(async (req, res, next) => {
  const deviceCategory = await DeviceCategory.findById(req.params.id);

  if (!deviceCategory) {
    return next(new ErrorHander("DeviceCategory not found", 404));
  }

  await deviceCategory.remove();

  res.status(200).json({
    success: true,
    message: "DeviceCategory Delete Successfully",
  });
});
