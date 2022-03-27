const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Employee = require("../models/employeeModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { userToken } = req.cookies;

  if (!userToken) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(userToken, process.env.JWT_SECRET);
console.log(decodedData);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.isAuthenticatedEmployee = catchAsyncErrors(async (req, res, next) => {
  const { employeeToken } = req.cookies;

  if (!employeeToken) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(employeeToken, process.env.JWT_SECRET);
console.log(decodedData);
  req.employee = await Employee.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
