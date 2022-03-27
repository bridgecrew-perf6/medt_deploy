const ProductCategory = require("../models/productCategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create ProductCategory -- Admin
exports.createProductCategory = catchAsyncErrors(async (req, res, next) => {
  const productCategory = await ProductCategory.create(req.body);

  res.status(201).json({
    success: true,
    productCategory,
  });
});

// Get All ProductCategory
exports.getAllProductCategorys = catchAsyncErrors(async (req, res, next) => {

  res.status(200).json({
    success: true,
    productCategorys,
  });
});

// Get All ProductCategory (Admin)
exports.getAdminProductCategorys = catchAsyncErrors(async (req, res, next) => {
  const productCategorys = await ProductCategory.find();

  res.status(200).json({
    success: true,
    productCategorys,
  });
});

// Get ProductCategory Details
exports.getProductCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const productCategory = await ProductCategory.findById(req.params.id);

  if (!productCategory) {
    return next(new ErrorHander("ProductCategory not found", 404));
  }

  res.status(200).json({
    success: true,
    productCategory,
  });
});

// Update ProductCategory -- Admin

exports.updateProductCategory = catchAsyncErrors(async (req, res, next) => {
  let productCategory = await ProductCategory.findById(req.params.id);

  if (!productCategory) {
    return next(new ErrorHander("ProductCategory not found", 404));
  }

  productCategory = await ProductCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    productCategory,
  });
});

// Delete ProductCategory

exports.deleteProductCategory = catchAsyncErrors(async (req, res, next) => {
  const productCategory = await ProductCategory.findById(req.params.id);

  if (!productCategory) {
    return next(new ErrorHander("ProductCategory not found", 404));
  }

  await productCategory.remove();

  res.status(200).json({
    success: true,
    message: "ProductCategory Delete Successfully",
  });
});
