const express = require("express");
const {
  getAllChemicals,
  createChemical,
  updateChemical,
  deleteChemical,
  getChemicalDetails,
  getChemicalsByDrugCategory,
} = require("../controllers/chemicalController");
const router = express.Router();

router.route("/chemicals").get(getAllChemicals);
router.route("/chemicalsByDrugCategory/:drugCategory").get(getChemicalsByDrugCategory);
router.route("/chemical/new").post(createChemical);
router
  .route("/chemical/:id")
  .put(updateChemical)
  .delete(deleteChemical)
  .get(getChemicalDetails);

module.exports = router;
