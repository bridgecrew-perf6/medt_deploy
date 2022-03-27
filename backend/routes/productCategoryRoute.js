const express = require("express");
const {
  getAllProductCategorys,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategoryDetails,
  getAdminProductCategorys,
} = require("../controllers/productCategoryController");
const router = express.Router();

router.route("/productCategorys").get(getAllProductCategorys);
router.route("/admin/productCategorys").get(getAdminProductCategorys);
router.route("/productCategory/new").post(createProductCategory);
router
  .route("/productCategory/:id")
  .put(updateProductCategory)
  .delete(deleteProductCategory)
  .get(getProductCategoryDetails);

module.exports = router;
