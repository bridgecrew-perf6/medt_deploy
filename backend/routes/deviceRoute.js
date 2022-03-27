const express = require("express");
const {
  getAllDevices,
  createDevice,
  updateDevice,
  deleteDevice,
  getDeviceDetails,
  createDeviceReview,
  getDeviceReviews,
  deleteReview,
  getAdminDevices,
  getAdminDevicesByZoneId,
} = require("../controllers/deviceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/devices").get(getAllDevices);
router.route("/devicesByZone/:zoneId").get(getAdminDevicesByZoneId);

router
  .route("/admin/devices")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminDevices);

router.route("/device/new").post(createDevice);

router
  .route("/device/:id")
  .put(isAuthenticatedUser, updateDevice)
  .delete(deleteDevice);

router.route("/device/:id").get(getDeviceDetails);

router.route("/review").put(isAuthenticatedUser, createDeviceReview);

router
  .route("/reviews")
  .get(getDeviceReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
