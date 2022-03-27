const express = require("express");
const {
  getAllDeviceCategorys,
  createDeviceCategory,
  updateDeviceCategory,
  deleteDeviceCategory,
  getDeviceCategoryDetails,
  getAdminDeviceCategorys,
} = require("../controllers/deviceCategoryController");
const router = express.Router();

router.route("/deviceCategorys").get(getAllDeviceCategorys);
router.route("/admin/deviceCategorys").get(getAdminDeviceCategorys);
router.route("/deviceCategory/new").post(createDeviceCategory);
router
  .route("/deviceCategory/:id")
  .put(updateDeviceCategory)
  .delete(deleteDeviceCategory)
  .get(getDeviceCategoryDetails);

module.exports = router;
