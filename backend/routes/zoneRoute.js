const express = require("express");
const {
  getAllZones,
  createZone,
  updateZone,
  deleteZone,
  getZoneDetails,
} = require("../controllers/zoneController");
const router = express.Router();

router.route("/zones").get(getAllZones);
router.route("/admin/zone/new").post(createZone);
router
  .route("/zone/:id")
  .put(updateZone)
  .delete(deleteZone)
  .get(getZoneDetails);

module.exports = router;
