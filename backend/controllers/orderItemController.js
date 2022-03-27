const OrderItem = require("../models/orderItemModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new OrderItem
exports.newOrderItem = catchAsyncErrors(async (req, res, next) => {
  const {
    zoneId,
    totalAmount,
    netPayable,
    couponDis,
    deliverCharge,
    saving,
    cashback,
    itemCount,
    packCount,
    orderItemStatus,
    statusText,
    shippingInfo,
    clientInfo,
    paymentInfo,
    deliveryInfo,
    couponInfo,
  } = req.body;

  const orderItem = await OrderItem.create(req.body);

  res.status(201).json({
    success: true,
    orderItem,
  });
});

// get Single OrderItem
exports.getSingleOrderItem = catchAsyncErrors(async (req, res, next) => {
  const orderItem = await OrderItem.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!orderItem) {
    return next(new ErrorHander("OrderItem not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    orderItem,
  });
});

// get logged in user  OrderItems
exports.myOrderItems = catchAsyncErrors(async (req, res, next) => {
  const orderItems = await OrderItem.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orderItems,
  });
});

// get all OrderItems -- Admin
exports.getAllOrderItems = catchAsyncErrors(async (req, res, next) => {
  const orderItems = await OrderItem.find();

  let totalAmount = 0;

  orderItems.forEach((orderItem) => {
    totalAmount += orderItem.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orderItems,
  });
});

// update OrderItem Status -- Admin
exports.updateOrderItem = catchAsyncErrors(async (req, res, next) => {
  const orderItem = await OrderItem.findById(req.params.id);

  if (!orderItem) {
    return next(new ErrorHander("OrderItem not found with this Id", 404));
  }

  if (orderItem.orderItemStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this orderItem", 400));
  }

  if (req.body.status === "Shipped") {
    orderItem.orderItemItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  orderItem.orderItemStatus = req.body.status;

  if (req.body.status === "Delivered") {
    orderItem.deliveredAt = Date.now();
  }

  await orderItem.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete OrderItem -- Admin
exports.deleteOrderItem = catchAsyncErrors(async (req, res, next) => {
  const orderItem = await OrderItem.findById(req.params.id);

  if (!orderItem) {
    return next(new ErrorHander("OrderItem not found with this Id", 404));
  }

  await orderItem.remove();

  res.status(200).json({
    success: true,
  });
});
