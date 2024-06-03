const express = require("express");
const router = express.Router();
const {
  createOrder,
  orderData,
  allOrders,
  deleteOrder,
  orderDataById,
  updateOrder,
  ordersByEmail
} = require("../controllers/OrderController");

router.post("/create", createOrder);
router.post("/allorder", allOrders);
router.post("/orderdatabyid", orderDataById);
router.post("/orderdata", orderData);
router.post("/updateorder", updateOrder);
router.post("/deleteorder", deleteOrder);
router.post("/emailorder", ordersByEmail);

module.exports = router;
