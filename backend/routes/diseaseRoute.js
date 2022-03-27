const express = require("express");
const {
  getAllDiseases,
  createDisease,
  updateDisease,
  deleteDisease,
  getDiseaseDetails,
  getAdminDiseases,
} = require("../controllers/diseaseController");
const router = express.Router();

router.route("/diseases").get(getAllDiseases);
router.route("/admin/diseases").get(getAdminDiseases);
router.route("/disease/new").post(createDisease);
router
  .route("/disease/:id")
  .put(updateDisease)
  .delete(deleteDisease)
  .get(getDiseaseDetails);

module.exports = router;
