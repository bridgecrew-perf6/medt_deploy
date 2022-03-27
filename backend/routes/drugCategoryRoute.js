const express = require("express");
const {
  getAdminDrugCategorys,
  createDrugCategory,
  updateDrugCategory,
  deleteDrugCategory,
  getDrugCategoryDetails,
} = require("../controllers/drugCategoryController");
const router = express.Router();

// router.route("/drugCategorys").get(getAllDrugCategorys);
router.route("/admin/drugCategorys").get(getAdminDrugCategorys);
router.route("/admin/drugCategory/new").post(createDrugCategory);
router
  .route("/admin/drugCategory/:id")
  .put(updateDrugCategory)
  .delete(deleteDrugCategory)
  .get(getDrugCategoryDetails);

module.exports = router;
