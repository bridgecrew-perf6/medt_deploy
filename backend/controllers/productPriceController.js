const ProductPrice = require("../models/productPriceModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create ProductPrice -- Admin
exports.createProductPrice = catchAsyncErrors(async (req, res, next) => {
  const productPrice = await ProductPrice.create(req.body);

  res.status(201).json({
    success: true,
    productPrice,
  });
});

// Get All ProductPrices
exports.getAllProductPrices = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productPricesCount = await ProductPrice.countDocuments();

  const apiFeature = new ApiFeatures(ProductPrice.find(), req.query)
    .search()
    .filter();

  let productPrices = await apiFeature.query;

  let filteredProductPricesCount = productPrices.length;

  apiFeature.pagination(resultPerPage);

  productPrices = await apiFeature.query;

  res.status(200).json({
    success: true,
    productPrices,
    productPricesCount,
    resultPerPage,
    filteredProductPricesCount,
  });
});

// Get All ProductPrice (Admin)
exports.getAdminProductPrices = catchAsyncErrors(async (req, res, next) => {
  const productPrices = await ProductPrice.find();

  res.status(200).json({
    success: true,
    productPrices,
  });
});

// Get ProductPrice Details
exports.getProductPriceDetails = catchAsyncErrors(async (req, res, next) => {
  const productPrice = await ProductPrice.findById(req.params.id);

  if (!productPrice) {
    return next(new ErrorHander("ProductPrice not found", 404));
  }

  res.status(200).json({
    success: true,
    productPrice,
  });
});

// Get all ProductPrices By ZoneId
exports.getAllProductPricesByZoneId = catchAsyncErrors(
  async (req, res, next) => {
    const productPrices = await ProductPrice.find({ zoneId: req.params.zoneId });


    res.status(200).json({
      success: true,
      productPrices,
    });
  }
);

// Get all ProductPrices By ProductId
exports.getAllProductPricesByProductId = catchAsyncErrors(
  async (req, res, next) => {
    const productPrices = await ProductPrice.find({ productId: req.params.productId });

    res.status(200).json({
      success: true,
      productPrices,
    });
  }
);

// Get ProductPrice By Product And Zone Id Details
exports.getProductPriceDetailsByProductZoneId = catchAsyncErrors(
  async (req, res, next) => {
    const productPrice = await ProductPrice.findOne({
      productId: req.params.productId,
      zoneId: req.params.zoneId,
    });

    if (!productPrice) {
      return next(new ErrorHander("ProductPrice not found", 404));
    }

    res.status(200).json({
      success: true,
      productPrice,
    });
  }
);

// Update ProductPrice -- Admin

exports.updateProductPrice = catchAsyncErrors(async (req, res, next) => {
  let productPrice = await ProductPrice.findById(req.params.id);

  if (!productPrice) {
    return next(new ErrorHander("ProductPrice not found", 404));
  }

  productPrice = await ProductPrice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    productPrice,
  });
});

// Update ProductPrice -- Admin

exports.updateProductPriceByProductZoneId = catchAsyncErrors(
  async (req, res, next) => {
    let productPrice = await ProductPrice.findOne({
      productId: req.params.productId,
      zoneId: req.params.zoneId,
    });

    if (!productPrice) {
      return next(new ErrorHander("ProductPrice not found", 404));
    }

    productPrice = await ProductPrice.findOneAndUpdate(
      { productId: req.params.productId, zoneId: req.params.zoneId },
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      productPrice,
    });
  }
);

// Delete ProductPrice

exports.deleteProductPrice = catchAsyncErrors(async (req, res, next) => {
  const productPrice = await ProductPrice.findById(req.params.id);

  if (!productPrice) {
    return next(new ErrorHander("ProductPrice not found", 404));
  }

  await productPrice.remove();

  res.status(200).json({
    success: true,
    message: "ProductPrice Delete Successfully",
  });
});

// Delete ProductPriceByProductId

exports.deleteProductPriceByProductId = catchAsyncErrors(async (req, res, next) => {
  let productPrice = await ProductPrice.find({ productId: req.params.productId });

  if (!productPrice) {
    return next(new ErrorHander("ProductPrice not found", 404));
  }

  // console.log(productPrice)
  productPrice = await ProductPrice.deleteMany({ productId: req.params.productId });

  res.status(200).json({
    success: true,
    message: "ProductPrice Delete Successfully",
  });
});

// Delete ProductPriceByZoneId

exports.deleteProductPriceByZoneId = catchAsyncErrors(async (req, res, next) => {
  let productPrice = await ProductPrice.find({ zoneId: req.params.zoneId });

  if (!productPrice) {
    return next(new ErrorHander("ProductPrice not found", 404));
  }

  // console.log(productPrice)
  productPrice = await ProductPrice.deleteMany({ zoneId: req.params.zoneId });

  res.status(200).json({
    success: true,
    message: "ProductPrice Delete Successfully",
  });
});
