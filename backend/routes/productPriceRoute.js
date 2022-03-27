const express = require("express");
const {
  getAllProductPrices,
  createProductPrice,
  updateProductPrice,
  deleteProductPrice,
  getProductPriceDetails,
  getAdminProductPrices,
  getProductPriceDetailsByZoneId,
  getProductPriceDetailsByProductId,
  deleteProductPriceByProductId,
  getAllProductPricesByZoneId,
  getAllProductPricesByProductId,
  getProductPriceDetailsByProductZoneId,
  deleteProductPriceByZoneId,
  updateProductPriceByProductZoneId,
} = require("../controllers/productPriceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/productPrices").get(getAllProductPrices);

router
  .route("/admin/productPrices")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProductPrices);

router.route("/productPrice/new").post(isAuthenticatedUser, createProductPrice);

router
  .route("/admin/productPrice/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProductPrice)
  .delete(deleteProductPrice);

router
  .route("/admin/productPriceByProduct/:productId")
  .delete(deleteProductPriceByProductId);
router
  .route("/admin/productPriceByZone/:zoneId")
  .delete(deleteProductPriceByZoneId);

router.route("/productPrice/:id").get(getProductPriceDetails);
router.route("/productPricesByZone/:zoneId").get(getAllProductPricesByZoneId);
router
  .route("/productPricesByProduct/:productId")
  .get(getAllProductPricesByProductId);
router
  .route("/productPriceByProductZone/:productId/:zoneId")
  .get(getProductPriceDetailsByProductZoneId)
  .put(updateProductPriceByProductZoneId);

module.exports = router;
