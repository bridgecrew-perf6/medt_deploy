const express = require("express");
const {
  getAllDrugs,
  createDrug,
  updateDrug,
  deleteDrug,
  getDrugDetails,
  createDrugReview,
  getDrugReviews,
  deleteReview,
  getAdminDrugs,
  getAdminDrugsByZoneId,
} = require("../controllers/drugController");
const { isAuthenticatedUser, authorizeRoles, isAuthenticatedEmployee } = require("../middleware/auth");

const router = express.Router();

router.route("/drugs").get(getAllDrugs);
router.route("/drugsByZone/:zoneId").get(getAdminDrugsByZoneId);

router
  .route("/admin/drugs")
  .get( getAdminDrugs);

router.route("/drug/new").post(createDrug);

router
  .route("/admin/drug/:id")
  .put(isAuthenticatedUser, isAuthenticatedEmployee, updateDrug)
  .delete(deleteDrug);

router.route("/drug/:id").get(getDrugDetails);

router.route("/review").put(isAuthenticatedUser, createDrugReview);

router
  .route("/reviews")
  .get(getDrugReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
