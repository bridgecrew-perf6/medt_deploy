const express = require("express");
const {
  getAllPinAmounts,
  createPinAmount,
  updatePinAmount,
  deletePinAmount,
  getPinAmountDetails,
} = require("../controllers/pinAmountController");
const router = express.Router();

router.route("/pinAmounts").get(getAllPinAmounts);
router.route("/pinAmount/new").post(createPinAmount);
router
  .route("/pinAmount/:id")
  .put(updatePinAmount)
  .delete(deletePinAmount)
  .get(getPinAmountDetails);

module.exports = router;
