// Create Token and saving in cookie

exports.sendUserToken = (user, statusCode, res) => {
  const userToken = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("userToken", userToken, options).json({
    success: true,
    user,
    userToken,
  });
};

// module.exports = sendUserToken;

exports.sendEmployeeToken = (employee, statusCode, res) => {
  const employeeToken = employee.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("employeeToken", employeeToken, options).json({
    success: true,
    employee,
    employeeToken,
  });
};

// module. = sendEmployeeToken;
