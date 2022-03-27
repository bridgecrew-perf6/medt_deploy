const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Employee = require("../models/employeeModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { sendEmployeeToken } = require("../utils/jwtToken");

// Register a Employee
exports.registerEmployee = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });
  // (req.body.avatar.public_id = myCloud.public_id),
  //   (req.body.avatar.url = myCloud.secure_url),
  //   (req.body.user = req.user.id);

  const employee = await Employee.create(req.body);

  res.status(200).json({
    success: true,
    message: "Employee Created Successfully",
  });
});

// Login Employee
exports.loginEmployee = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if employee has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const employee = await Employee.findOne({ email }).select("+password");

  if (!employee) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await employee.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendEmployeeToken(employee, 200, res);
});

// Logout Employee
exports.logoutEmployee = catchAsyncErrors(async (req, res, next) => {
  res.cookie("employeeToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email });

  if (!employee) {
    return next(new ErrorHander("Employee not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = employee.getResetPasswordToken();

  await employee.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/employee/password/reset/${resetToken}`;

  const message = `Your password reset employeeToken is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: employee.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${employee.email} successfully`,
    });
  } catch (error) {
    employee.resetPasswordToken = undefined;
    employee.resetPasswordExpire = undefined;

    await employee.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating employeeToken hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.employeeToken)
    .digest("hex");

  const employee = await Employee.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!employee) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  employee.password = req.body.password;
  employee.resetPasswordToken = undefined;
  employee.resetPasswordExpire = undefined;

  await employee.save();

  sendEmployeeToken(employee, 200, res);
});

// Get Employee Detail
exports.getEmployeeDetails = catchAsyncErrors(async (req, res, next) => {

  console.log(req);
  const employee = await Employee.findById(req.employee.id);
  console.log(employee);

  res.status(200).json({
    success: true,
    employee,
  });
});

// update Employee password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.employee.id).select("+password");

  const isPasswordMatched = await employee.comparePassword(
    req.body.oldPassword
  );

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not match", 400));
  }

  employee.password = req.body.newPassword;

  await employee.save();

  sendEmployeeToken(employee, 200, res);
});

// update Employee Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newEmployeeData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const employee = await Employee.findById(req.employee.id);

    const imageId = employee.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newEmployeeData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const employee = await Employee.findByIdAndUpdate(
    req.employee.id,
    newEmployeeData,
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

// Get all employees(admin)
exports.getAllEmployee = catchAsyncErrors(async (req, res, next) => {
  const employees = await Employee.find();

  res.status(200).json({
    success: true,
    employees,
  });
});

// Get single employee (admin)
exports.getSingleEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new ErrorHander(`Employee does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    employee,
  });
});

// update Employee Role -- Admin
exports.updateEmployeeRole = catchAsyncErrors(async (req, res, next) => {
  const newEmployeeData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await Employee.findByIdAndUpdate(req.params.id, newEmployeeData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete Employee --Admin
exports.deleteEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new ErrorHander(`Employee does not exist.`, 400));
  }

  // const imageId = employee.avatar.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  await employee.remove();

  res.status(200).json({
    success: true,
    message: "Employee Deleted Successfully",
  });
});
