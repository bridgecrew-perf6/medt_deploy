const Chemical = require("../models/chemicalModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Chemical -- Admin
exports.createChemical = catchAsyncErrors(async (req, res, next) => {
  const chemical = await Chemical.create(req.body);

  res.status(201).json({
    success: true,
    chemical,
  });
});

// Get All Chemical
exports.getAllChemicals = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const chemicalsCount = await Chemical.countDocuments();

  const apiFeature = new ApiFeatures(
    Chemical.find().sort({ createdAt: -1 }),
    req.query
  ).search();

  let chemicals = await apiFeature.query;
  chemicals = await apiFeature.query;

  res.status(200).json({
    success: true,
    chemicals,
    chemicalsCount,
  });
});

// Get All Chemical (Admin)
exports.getAdminChemicals = catchAsyncErrors(async (req, res, next) => {
  const chemicals = await Chemical.find();

  res.status(200).json({
    success: true,
    chemicals,
  });
});

// Get Chemical Details
exports.getChemicalsByDrugCategory = catchAsyncErrors(async (req, res, next) => {
  const chemicals = await Chemical.find({drugCategory: req.params.drugCategory}).sort({ name: 1 });

  if (!chemicals) {
    return next(new ErrorHander("Chemical not found", 404));
  }

  res.status(200).json({
    success: true,
    chemicals,
  });
});

// Get Chemical Details
exports.getChemicalDetails = catchAsyncErrors(async (req, res, next) => {
  const chemical = await Chemical.findById(req.params.id);

  if (!chemical) {
    return next(new ErrorHander("Chemical not found", 404));
  }

  res.status(200).json({
    success: true,
    chemical,
  });
});

// Update Chemical -- Admin

exports.updateChemical = catchAsyncErrors(async (req, res, next) => {
  let chemical = await Chemical.findById(req.params.id);

  if (!chemical) {
    return next(new ErrorHander("Chemical not found", 404));
  }

  chemical = await Chemical.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    chemical,
  });
});

// Delete Chemical

exports.deleteChemical = catchAsyncErrors(async (req, res, next) => {
  const chemical = await Chemical.findById(req.params.id);

  if (!chemical) {
    return next(new ErrorHander("Chemical not found", 404));
  }

  await chemical.remove();

  res.status(200).json({
    success: true,
    message: "Chemical Delete Successfully",
  });
});
