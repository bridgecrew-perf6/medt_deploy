const Disease = require("../models/diseaseModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Disease -- Admin
exports.createDisease = catchAsyncErrors(async (req, res, next) => {
  const disease = await Disease.create(req.body);

  res.status(201).json({
    success: true,
    disease,
  });
});

// Get All Disease
exports.getAllDiseases = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const diseasesCount = await Disease.countDocuments();

  const apiFeature = new ApiFeatures(
    Disease.find().sort({ createdAt: -1 }),
    req.query
  ).search();

  let diseases = await apiFeature.query;
  diseases = await apiFeature.query;

  res.status(200).json({
    success: true,
    diseases,
    diseasesCount,
  });
});

// Get All Disease (Admin)
exports.getAdminDiseases = catchAsyncErrors(async (req, res, next) => {
  const diseases = await Disease.find();

  res.status(200).json({
    success: true,
    diseases,
  });
});

// Get Disease Details
exports.getDiseaseDetails = catchAsyncErrors(async (req, res, next) => {
  const disease = await Disease.findById(req.params.id);

  if (!disease) {
    return next(new ErrorHander("Disease not found", 404));
  }

  res.status(200).json({
    success: true,
    disease,
  });
});

// Update Disease -- Admin

exports.updateDisease = catchAsyncErrors(async (req, res, next) => {
  let disease = await Disease.findById(req.params.id);

  if (!disease) {
    return next(new ErrorHander("Disease not found", 404));
  }

  disease = await Disease.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    disease,
  });
});

// Delete Disease

exports.deleteDisease = catchAsyncErrors(async (req, res, next) => {
  const disease = await Disease.findById(req.params.id);

  if (!disease) {
    return next(new ErrorHander("Disease not found", 404));
  }

  await disease.remove();

  res.status(200).json({
    success: true,
    message: "Disease Delete Successfully",
  });
});
