const DrugCategory = require("../models/drugCategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create DrugCategory -- Admin
exports.createDrugCategory = catchAsyncErrors(async (req, res, next) => {
  const drugCategory = await DrugCategory.create(req.body);

  res.status(201).json({
    success: true,
    drugCategory,
  });
});

// Get All DrugCategory (Admin)
exports.getAdminDrugCategorys = catchAsyncErrors(async (req, res, next) => {
  const drugCategorys = await DrugCategory.find();

  res.status(200).json({
    success: true,
    drugCategorys,
  });
});

// Get DrugCategory Details
exports.getDrugCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const drugCategory = await DrugCategory.findById(req.params.id);

  if (!drugCategory) {
    return next(new ErrorHander("DrugCategory not found", 404));
  }

  res.status(200).json({
    success: true,
    drugCategory,
  });
});

// Update DrugCategory -- Admin

exports.updateDrugCategory = catchAsyncErrors(async (req, res, next) => {
  let drugCategory = await DrugCategory.findById(req.params.id);

  if (!drugCategory) {
    return next(new ErrorHander("DrugCategory not found", 404));
  }

  drugCategory = await DrugCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    drugCategory,
  });
});

// Delete DrugCategory

exports.deleteDrugCategory = catchAsyncErrors(async (req, res, next) => {
  const drugCategory = await DrugCategory.findById(req.params.id);

  if (!drugCategory) {
    return next(new ErrorHander("DrugCategory not found", 404));
  }

  await drugCategory.remove();

  res.status(200).json({
    success: true,
    message: "DrugCategory Delete Successfully",
  });
});
