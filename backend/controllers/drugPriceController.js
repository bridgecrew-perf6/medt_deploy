const DrugPrice = require("../models/drugPriceModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create DrugPrice -- Admin
exports.createDrugPrice = catchAsyncErrors(async (req, res, next) => {
  const drugPrice = await DrugPrice.create(req.body);

  res.status(201).json({
    success: true,
    drugPrice,
  });
});

// Get All DrugPrices
exports.getAllDrugPrices = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const drugPricesCount = await DrugPrice.countDocuments();

  const apiFeature = new ApiFeatures(DrugPrice.find(), req.query)
    .search()
    .filter();

  let drugPrices = await apiFeature.query;

  let filteredDrugPricesCount = drugPrices.length;

  apiFeature.pagination(resultPerPage);

  drugPrices = await apiFeature.query;

  res.status(200).json({
    success: true,
    drugPrices,
    drugPricesCount,
    resultPerPage,
    filteredDrugPricesCount,
  });
});

// Get All DrugPrice (Admin)
exports.getAdminDrugPrices = catchAsyncErrors(async (req, res, next) => {
  const drugPrices = await DrugPrice.find();

  res.status(200).json({
    success: true,
    drugPrices,
  });
});

// Get DrugPrice Details
exports.getDrugPriceDetails = catchAsyncErrors(async (req, res, next) => {
  const drugPrice = await DrugPrice.findById(req.params.id);

  if (!drugPrice) {
    return next(new ErrorHander("DrugPrice not found", 404));
  }

  res.status(200).json({
    success: true,
    drugPrice,
  });
});

// Get all DrugPrices By ZoneId
exports.getAllDrugPricesByZoneId = catchAsyncErrors(
  async (req, res, next) => {
    const drugPrices = await DrugPrice.find({ zoneId: req.params.zoneId });


    res.status(200).json({
      success: true,
      drugPrices,
    });
  }
);

// Get all DrugPrices By DrugId
exports.getAllDrugPricesByDrugId = catchAsyncErrors(
  async (req, res, next) => {
    const drugPrices = await DrugPrice.find({ drugId: req.params.drugId });

    res.status(200).json({
      success: true,
      drugPrices,
    });
  }
);

// Get DrugPrice By Drug And Zone Id Details
exports.getDrugPriceDetailsByDrugZoneId = catchAsyncErrors(
  async (req, res, next) => {
    const drugPrice = await DrugPrice.findOne({
      drugId: req.params.drugId,
      zoneId: req.params.zoneId,
    });

    if (!drugPrice) {
      return next(new ErrorHander("DrugPrice not found", 404));
    }

    res.status(200).json({
      success: true,
      drugPrice,
    });
  }
);


// Update DrugPrice -- Admin

exports.updateDrugPrice = catchAsyncErrors(async (req, res, next) => {
  let drugPrice = await DrugPrice.findById(req.params.id);

  if (!drugPrice) {
    return next(new ErrorHander("DrugPrice not found", 404));
  }

  drugPrice = await DrugPrice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    drugPrice,
  });
});

// Update DrugPrice -- Admin

exports.updateDrugPriceByDrugZoneId = catchAsyncErrors(
  async (req, res, next) => {
    let drugPrice = await DrugPrice.findOne({
      drugId: req.params.drugId,
      zoneId: req.params.zoneId,
    });

    if (!drugPrice) {
      return next(new ErrorHander("DrugPrice not found", 404));
    }

    drugPrice = await DrugPrice.findOneAndUpdate(
      { drugId: req.params.drugId, zoneId: req.params.zoneId },
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      drugPrice,
    });
  }
);

// Delete DrugPrice

exports.deleteDrugPrice = catchAsyncErrors(async (req, res, next) => {
  const drugPrice = await DrugPrice.findById(req.params.id);

  if (!drugPrice) {
    return next(new ErrorHander("DrugPrice not found", 404));
  }

  await drugPrice.remove();

  res.status(200).json({
    success: true,
    message: "DrugPrice Delete Successfully",
  });
});

// Delete DrugPriceByDrugId

exports.deleteDrugPriceByDrugId = catchAsyncErrors(async (req, res, next) => {
  let drugPrice = await DrugPrice.find({ drugId: req.params.drugId });

  if (!drugPrice) {
    return next(new ErrorHander("DrugPrice not found", 404));
  }

  // console.log(drugPrice)
  drugPrice = await DrugPrice.deleteMany({ drugId: req.params.drugId });

  res.status(200).json({
    success: true,
    message: "DrugPrice Delete Successfully",
  });
});

// Delete DrugPriceByZoneId

exports.deleteDrugPriceByZoneId = catchAsyncErrors(async (req, res, next) => {
  let drugPrice = await DrugPrice.find({ zoneId: req.params.zoneId });

  if (!drugPrice) {
    return next(new ErrorHander("DrugPrice not found", 404));
  }

  // console.log(drugPrice)
  drugPrice = await DrugPrice.deleteMany({ zoneId: req.params.zoneId });

  res.status(200).json({
    success: true,
    message: "DrugPrice Delete Successfully",
  });
});
