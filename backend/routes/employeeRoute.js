const express = require("express");
const {
  registerEmployee,
  loginEmployee,
  logoutEmployee,
  forgotPassword,
  resetPassword,
  getEmployeeDetails,
  updatePassword,
  updateProfile,
  getAllEmployee,
  getSingleEmployee,
  updateEmployeeRole,
  deleteEmployee,
} = require("../controllers/employeeController");

const { isAuthenticatedEmployee, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/employee/register").post(registerEmployee);

router.route("/employee/login").post(loginEmployee);

router.route("/employee/password/forgot").post(forgotPassword);

router.route("/employee/password/reset/:employeeToken").put(resetPassword);

router.route("/employee/logout").get(isAuthenticatedEmployee, logoutEmployee);

router.route("/employee/me").get(isAuthenticatedEmployee, getEmployeeDetails);

router
  .route("/employee/password/update")
  .put(isAuthenticatedEmployee, updatePassword);

router.route("/employee/me/update").put(isAuthenticatedEmployee, updateProfile);

router
  .route("/admin/employees")
  .get(  getAllEmployee);

router
  .route("/admin/employee/:id")
  .get(  getSingleEmployee)
  .put(  updateEmployeeRole)
  .delete( deleteEmployee);

module.exports = router;
