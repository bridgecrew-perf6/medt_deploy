const express = require("express");
const {
  getAllDevicePrices,
  createDevicePrice,
  updateDevicePrice,
  deleteDevicePrice,
  getDevicePriceDetails,
  getAdminDevicePrices,
  getDevicePriceDetailsByZoneId,
  getDevicePriceDetailsByDeviceId,
  deleteDevicePriceByDeviceId,
  getDevicePriceDetailsByDeviceZoneId,
  getAllDevicePricesByZoneId,
  getAllDevicePricesByDeviceId,
  deleteDevicePriceByZoneId,
  updateDevicePriceByDeviceZoneId,
} = require("../controllers/devicePriceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/devicePrices").get(getAllDevicePrices);

router
  .route("/admin/devicePrices")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminDevicePrices);

router.route("/devicePrice/new").post(isAuthenticatedUser, createDevicePrice);

router
  .route("/admin/devicePrice/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateDevicePrice)
  .delete(deleteDevicePrice);

router
  .route("/admin/devicePriceByDevice/:deviceId")
  .delete(deleteDevicePriceByDeviceId);
router
  .route("/admin/devicePriceByZone/:zoneId")
  .delete(deleteDevicePriceByZoneId);

router.route("/devicePrice/:id").get(getDevicePriceDetails);
router.route("/devicePricesByZone/:zoneId").get(getAllDevicePricesByZoneId);
router
  .route("/devicePricesByDevice/:deviceId")
  .get(getAllDevicePricesByDeviceId);
router
  .route("/devicePriceByDeviceZone/:deviceId/:zoneId")
  .get(getDevicePriceDetailsByDeviceZoneId)
  .put(updateDevicePriceByDeviceZoneId);

module.exports = router;
