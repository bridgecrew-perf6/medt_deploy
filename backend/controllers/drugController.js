const Drug = require("../models/drugModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Drug -- Admin
exports.createDrug = catchAsyncErrors(async (req, res, next) => {
  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  // const imagesLinks = [];

  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.v2.uploader.upload(images[i], {
  //     folder: "drugs",
  //   });

  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }

  // req.body.images = imagesLinks;
  // req.body.user = req.user.id;

  const drug = await Drug.create(req.body);

  res.status(201).json({
    success: true,
    drug,
  });
});

// Get All Drugs
exports.getAllDrugs = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const drugsCount = await Drug.countDocuments();

  const apiFeature = new ApiFeatures(Drug.find(), req.query)
    .search()
    .filter();

  let drugs = await apiFeature.query;

  let filteredDrugsCount = drugs.length;

  apiFeature.pagination(resultPerPage);

  drugs = await apiFeature.query;

  res.status(200).json({
    success: true,
    drugs,
    drugsCount,
    resultPerPage,
    filteredDrugsCount,
  });
});

// Get All Drug (Admin)
exports.getAdminDrugs = catchAsyncErrors(async (req, res, next) => {
  const drugs = await Drug.find();

  res.status(200).json({
    success: true,
    drugs,
  });
});

// Get All Drug By ZoneId(Admin)
exports.getAdminDrugsByZoneId = catchAsyncErrors(async (req, res, next) => {
  const drugs = await Drug.find({ zoneId: req.params.zoneId });

  res.status(200).json({
    success: true,
    drugs,
  });
});

// Get Drug Details
exports.getDrugDetails = catchAsyncErrors(async (req, res, next) => {
  const drug = await Drug.findById(req.params.id);

  if (!drug) {
    return next(new ErrorHander("Drug not found", 404));
  }

  res.status(200).json({
    success: true,
    drug,
  });
});

// Update Drug -- Admin

exports.updateDrug = catchAsyncErrors(async (req, res, next) => {
  let drug = await Drug.findById(req.params.id);

  if (!drug) {
    return next(new ErrorHander("Drug not found", 404));
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
    for (let i = 0; i < drug.images.length; i++) {
      await cloudinary.v2.uploader.destroy(drug.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "drugs",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  drug = await Drug.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    drug,
  });
});

// Delete Drug

exports.deleteDrug = catchAsyncErrors(async (req, res, next) => {
  const drug = await Drug.findById(req.params.id);

  if (!drug) {
    return next(new ErrorHander("Drug not found", 404));
  }

  // // Deleting Images From Cloudinary
  // for (let i = 0; i < drug.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(drug.images[i].public_id);
  // }

  await drug.remove();

  res.status(200).json({
    success: true,
    message: "Drug Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createDrugReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, drugId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const drug = await Drug.findById(drugId);

  const isReviewed = drug.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    drug.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    drug.reviews.push(review);
    drug.numOfReviews = drug.reviews.length;
  }

  let avg = 0;

  drug.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  drug.ratings = avg / drug.reviews.length;

  await drug.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a drug
exports.getDrugReviews = catchAsyncErrors(async (req, res, next) => {
  const drug = await Drug.findById(req.query.id);

  if (!drug) {
    return next(new ErrorHander("Drug not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: drug.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const drug = await Drug.findById(req.query.drugId);

  if (!drug) {
    return next(new ErrorHander("Drug not found", 404));
  }

  const reviews = drug.reviews.filter(
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

  await Drug.findByIdAndUpdate(
    req.query.drugId,
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
