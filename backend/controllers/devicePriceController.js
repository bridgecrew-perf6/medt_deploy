const DevicePrice = require("../models/devicePriceModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create DevicePrice -- Admin
exports.createDevicePrice = catchAsyncErrors(async (req, res, next) => {
  const devicePrice = await DevicePrice.create(req.body);

  res.status(201).json({
    success: true,
    devicePrice,
  });
});

// Get All DevicePrices
exports.getAllDevicePrices = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const devicePricesCount = await DevicePrice.countDocuments();

  const apiFeature = new ApiFeatures(DevicePrice.find(), req.query)
    .search()
    .filter();

  let devicePrices = await apiFeature.query;

  let filteredDevicePricesCount = devicePrices.length;

  apiFeature.pagination(resultPerPage);

  devicePrices = await apiFeature.query;

  res.status(200).json({
    success: true,
    devicePrices,
    devicePricesCount,
    resultPerPage,
    filteredDevicePricesCount,
  });
});

// Get All DevicePrice (Admin)
exports.getAdminDevicePrices = catchAsyncErrors(async (req, res, next) => {
  const devicePrices = await DevicePrice.find();

  res.status(200).json({
    success: true,
    devicePrices,
  });
});

// Get DevicePrice Details
exports.getDevicePriceDetails = catchAsyncErrors(async (req, res, next) => {
  const devicePrice = await DevicePrice.findById(req.params.id);

  if (!devicePrice) {
    return next(new ErrorHander("DevicePrice not found", 404));
  }

  res.status(200).json({
    success: true,
    devicePrice,
  });
});

// Get all DevicePrices By ZoneId
exports.getAllDevicePricesByZoneId = catchAsyncErrors(
  async (req, res, next) => {
    const devicePrices = await DevicePrice.find({ zoneId: req.params.zoneId });

    res.status(200).json({
      success: true,
      devicePrices,
    });
  }
);

// Get all DevicePrices By DeviceId
exports.getAllDevicePricesByDeviceId = catchAsyncErrors(
  async (req, res, next) => {
    const devicePrices = await DevicePrice.find({
      deviceId: req.params.deviceId,
    });

    res.status(200).json({
      success: true,
      devicePrices,
    });
  }
);

// Get DevicePrice Details
exports.getDevicePriceDetailsByDeviceZoneId = catchAsyncErrors(
  async (req, res, next) => {
    const devicePrice = await DevicePrice.findOne({
      deviceId: req.params.deviceId,
      zoneId: req.params.zoneId,
    });

    if (!devicePrice) {
      return next(new ErrorHander("DevicePrice not found", 404));
    }

    res.status(200).json({
      success: true,
      devicePrice,
    });
  }
);

// Update DevicePrice -- Admin

exports.updateDevicePrice = catchAsyncErrors(async (req, res, next) => {
  let devicePrice = await DevicePrice.findById(req.params.id);

  if (!devicePrice) {
    return next(new ErrorHander("DevicePrice not found", 404));
  }

  devicePrice = await DevicePrice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    devicePrice,
  });
});

// Update DevicePrice -- Admin

exports.updateDevicePriceByDeviceZoneId = catchAsyncErrors(
  async (req, res, next) => {
    let devicePrice = await DevicePrice.findOne({
      deviceId: req.params.deviceId,
      zoneId: req.params.zoneId,
    });

    if (!devicePrice) {
      return next(new ErrorHander("DevicePrice not found", 404));
    }

    devicePrice = await DevicePrice.findOneAndUpdate(
      { deviceId: req.params.deviceId, zoneId: req.params.zoneId },
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      devicePrice,
    });
  }
);

// Delete DevicePrice

exports.deleteDevicePrice = catchAsyncErrors(async (req, res, next) => {
  const devicePrice = await DevicePrice.findById(req.params.id);

  if (!devicePrice) {
    return next(new ErrorHander("DevicePrice not found", 404));
  }

  await devicePrice.remove();

  res.status(200).json({
    success: true,
    message: "DevicePrice Delete Successfully",
  });
});

// Delete DevicePriceByDeviceId

exports.deleteDevicePriceByDeviceId = catchAsyncErrors(
  async (req, res, next) => {
    let devicePrice = await DevicePrice.find({ deviceId: req.params.deviceId });

    if (!devicePrice) {
      return next(new ErrorHander("DevicePrice not found", 404));
    }

    // console.log(devicePrice)
    devicePrice = await DevicePrice.deleteMany({
      deviceId: req.params.deviceId,
    });

    res.status(200).json({
      success: true,
      message: "DevicePrice Delete Successfully",
    });
  }
);

// Delete DevicePriceByZoneId

exports.deleteDevicePriceByZoneId = catchAsyncErrors(async (req, res, next) => {
  let devicePrice = await DevicePrice.find({ zoneId: req.params.zoneId });

  if (!devicePrice) {
    return next(new ErrorHander("DevicePrice not found", 404));
  }

  // console.log(devicePrice)
  devicePrice = await DevicePrice.deleteMany({ zoneId: req.params.zoneId });

  res.status(200).json({
    success: true,
    message: "DevicePrice Delete Successfully",
  });
});
