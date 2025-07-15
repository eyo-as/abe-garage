// Import express and create a router instance
const orderController = require("../controllers/order.controller");


const express = require("express");
const router = express.Router();


// Import middleware for authentication
const authMiddleware = require("../middlewares/auth.middleware");
// Route to add a new service
router.post(
  "/api/order",
  [authMiddleware.verifyToken],
  orderController.addOrder
);
router.get(
  "/api/orders",
  [authMiddleware.verifyToken],
  orderController.getAllOrders
);

router.get(
  "/api/order/:order_id",
  [authMiddleware.verifyToken],
  orderController.getOrderByID
);
module.exports = router;