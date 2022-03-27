const express = require("express");
const {
  newOrderItem,
  getSingleOrderItem,
  myOrderItems,
  getAllOrderItems,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/orderItemController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/orderItem/new").post(newOrderItem);

router.route("/orderItem/:id").get(getSingleOrderItem);

router.route("/orderItems/me").get(myOrderItems);

router.route("/admin/orderItems").get(getAllOrderItems);

router.route("/admin/orderItem/:id").put(updateOrderItem).delete(deleteOrderItem);

module.exports = router;
