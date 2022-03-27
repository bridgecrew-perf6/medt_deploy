const express = require("express");
const {
  getAllDrugPrices,
  createDrugPrice,
  updateDrugPrice,
  deleteDrugPrice,
  getDrugPriceDetails,
  getAdminDrugPrices,
  getDrugPriceDetailsByZoneId,
  getDrugPriceDetailsByDrugId,
  deleteDrugPriceByDrugId,
  getDrugPriceDetailsByDrugZoneId,
  getAllDrugPricesByDrugId,
  getAllDrugPricesByZoneId,
  deleteDrugPriceByZoneId,
  updateDrugPriceByDrugZoneId,
} = require("../controllers/drugPriceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/drugPrices").get(getAllDrugPrices);

router
  .route("/admin/drugPrices")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminDrugPrices);

router.route("/drugPrice/new").post(isAuthenticatedUser, createDrugPrice);

router
  .route("/admin/drugPrice/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateDrugPrice)
  .delete(deleteDrugPrice);

router.route("/admin/drugPriceByDrug/:drugId").delete(deleteDrugPriceByDrugId);
router
  .route("/admin/drugPriceByZone/:zoneId")
  .delete(deleteDrugPriceByZoneId);

router.route("/drugPrice/:id").get(getDrugPriceDetails);
router.route("/drugPricesByZone/:zoneId").get(getAllDrugPricesByZoneId);
router
  .route("/drugPricesByDrug/:drugId")
  .get(getAllDrugPricesByDrugId);
router
  .route("/drugPriceByDrugZone/:drugId/:zoneId")
  .get(getDrugPriceDetailsByDrugZoneId)
  .put(updateDrugPriceByDrugZoneId);

module.exports = router;
