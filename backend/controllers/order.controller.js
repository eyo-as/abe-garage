const orderService = require("../services/order.service");

async function addOrder(req, res) {
  try {
    const orderData = req.body;

    // Ensure required fields are valid
    if (
      !orderData.employee_id ||
      !orderData.customer_id ||
      !orderData.vehicle_id ||
      !orderData.order_total_price ||
      typeof orderData.order_status === "undefined" || // Ensure order_status is provided
      !orderData.services ||
      !Array.isArray(orderData.services) ||
      orderData.services.length === 0 ||
      !orderData.services.every(
        (service) =>
          service.service_id && service.service_completed !== undefined
      )
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message:
          "Please provide all required fields and ensure services are correctly formatted.",
      });
    }

    // Insert order into the database
    const order = await orderService.addNewOrder(orderData);

    if (!order || !order.order_id) {
      return res.status(400).json({
        error: "Failed to add the order!",
      });
    }

    // Insert order status
    // const statusResult = await orderService.addOrderStatus(
    //   order.order_id,
    //   orderData.order_status
    // );

    return res.status(201).json({
      message: "Order created successfully",
      order_id: order.order_id,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "An unexpected error occurred.",
    });
  }

}

async function getAllOrders(req, res, next) {

  const orders = await orderService.getAllOrders();
  if (!orders) {
    res.status(400).json({
      error: "Failed to get all orders!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: orders,
    });
  }
}

async function getOrderByID(req, res, next) {
const { order_id } = req.params;

// Ensure that order_id is provided
if (!order_id) {
  return res.status(400).json({
    error: "Order ID is required!",
  });
}

try {
  const [rows] = await orderService.getOrderById(order_id); // Call the service function
         if (rows.length === 0) {
           return null; // No order found
         }

  const order = rows;
   order.order_services = JSON.parse(`[${order.order_services}]`);
  res.status(200).json({
    status: "success",
    data: order,
  });
  console.log(order);
} catch (error) {
  next(error); // Forward the error to the error handling middleware
}
  }


module.exports = { addOrder, getAllOrders, getOrderByID };
