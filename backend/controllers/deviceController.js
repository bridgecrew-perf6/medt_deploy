const Device = require("../models/deviceModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Device -- Admin
exports.createDevice = catchAsyncErrors(async (req, res, next) => {
  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  // const imagesLinks = [];

  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.v2.uploader.upload(images[i], {
  //     folder: "devices",
  //   });

  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }

  // req.body.images = imagesLinks;
  // req.body.user = req.user.id;

  console.log("req.body");
  const device = await Device.create(req.body);
  console.log(req.body);
  console.log("req.body");

  res.status(201).json({
    success: true,
    device,
  });
});

// Get All Devices
exports.getAllDevices = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const devicesCount = await Device.countDocuments();

  const apiFeature = new ApiFeatures(Device.find(), req.query).search().filter();

  let devices = await apiFeature.query;

  let filteredDevicesCount = devices.length;

  apiFeature.pagination(resultPerPage);

  devices = await apiFeature.query;

  res.status(200).json({
    success: true,
    devices,
    devicesCount,
    resultPerPage,
    filteredDevicesCount,
  });
});

// Get All Device (Admin)
exports.getAdminDevices = catchAsyncErrors(async (req, res, next) => {
  const devices = await Device.find();

  res.status(200).json({
    success: true,
    devices,
  });
});

// Get All Device By ZoneId(Admin)
exports.getAdminDevicesByZoneId = catchAsyncErrors(async (req, res, next) => {
  const devices = await Device.find({ zoneId: req.params.zoneId });

  res.status(200).json({
    success: true,
    devices,
  });
});

// Get Device Details
exports.getDeviceDetails = catchAsyncErrors(async (req, res, next) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    return next(new ErrorHander("Device not found", 404));
  }

  res.status(200).json({
    success: true,
    device,
  });
});

// Update Device -- Admin

exports.updateDevice = catchAsyncErrors(async (req, res, next) => {
  let device = await Device.findById(req.params.id);

  if (!device) {
    return next(new ErrorHander("Device not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < device.images.length; i++) {
      await cloudinary.v2.uploader.destroy(device.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "devices",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  device = await Device.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    device,
  });
});

// Delete Device

exports.deleteDevice = catchAsyncErrors(async (req, res, next) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    return next(new ErrorHander("Device not found", 404));
  }

  // // Deleting Images From Cloudinary
  // for (let i = 0; i < device.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(device.images[i].public_id);
  // }

  await device.remove();

  res.status(200).json({
    success: true,
    message: "Device Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createDeviceReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, deviceId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const device = await Device.findById(deviceId);

  const isReviewed = device.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    device.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    device.reviews.push(review);
    device.numOfReviews = device.reviews.length;
  }

  let avg = 0;

  device.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  device.ratings = avg / device.reviews.length;

  await device.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a device
exports.getDeviceReviews = catchAsyncErrors(async (req, res, next) => {
  const device = await Device.findById(req.query.id);

  if (!device) {
    return next(new ErrorHander("Device not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: device.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const device = await Device.findById(req.query.deviceId);

  if (!device) {
    return next(new ErrorHander("Device not found", 404));
  }

  const reviews = device.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Device.findByIdAndUpdate(
    req.query.deviceId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
