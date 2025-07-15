const conn = require("../config/db.config");

async function addNewOrder(order) {
  
  let createdOrder = {};
  try {
    // Validate employee_id
    const [employeeCheck] = await conn.query(
      "SELECT * FROM employee WHERE employee_id = ?",
      [order.employee_id]
    );
   

    if (!employeeCheck || employeeCheck.length === 0) {
      throw new Error(`Employee with ID ${order.employee_id} does not exist.`);
    }

    // Insert into orders table
    const query =
      "INSERT INTO orders (employee_id, customer_id, vehicle_id, order_date, active_order, order_hash) VALUES (?, ?, ?, NOW(), ?, ?)";
    const result = await conn.query(query, [
      order.employee_id,
      order.customer_id,
      order.vehicle_id,
      order.active_order || 1,
      order.order_hash || "",
    ]);
    
    

    if (result.affectedRows !== 1) {
      throw new Error("Failed to insert into orders table");
    }

    const order_id = result.insertId;
   

    // Insert into order_info table
    const query2 =
      "INSERT INTO order_info (order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    await conn.query(query2, [
      order_id,
      order.order_total_price,
      order.estimated_completion_date || null,
      order.completion_date || null,
      order.additional_request || "",
      order.notes_for_internal_use || "",
      order.notes_for_customer || "",
      order.additional_requests_completed || 0,
    ]);

    // Check if order.services exists and is an array
    if (!Array.isArray(order.services)) {
      throw new Error("Services data is not an array or is missing");
    }

    // Proceed with inserting into order_services table
    if (order.services.length > 0) {
      console.log("Order services:", order.services); 

      const query3 =
        "INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)";
      for (const service of order.services) {
        if (
          service &&
          typeof service === "object" &&
          "service_id" in service &&
          "service_completed" in service
        ) {
          await conn.query(query3, [
            order_id,
            service.service_id,
            service.service_completed,
          ]);
        } else {
          throw new Error("Invalid service data provided");
        }
      }
    }

    // Insert into order_status table
    const query4 =
      "INSERT INTO order_status (order_id, order_status) VALUES (?, ?)";
    await conn.query(query4, [order_id, order.order_status]);

    createdOrder = {
      order_id: order_id,
    };
  } catch (err) {
    console.error("Error in addNewOrder:", err);
    createdOrder = false;
  }
  return createdOrder;
}

async function getAllOrders() {
 const query = `
      SELECT * 
      FROM orders 
      INNER JOIN order_info ON orders.order_id = order_info.order_id 
      INNER JOIN order_status ON orders.order_id = order_status.order_id 
      INNER JOIN order_services ON orders.order_id = order_services.order_id
    `;

  const rows = await conn.query(query);
  return rows;
}

async function getOrderById(order_id) {
  const query = `
    SELECT 
      orders.order_id,
      orders.employee_id,
      orders.customer_id,
      orders.vehicle_id,
      orders.order_date,
      order_info.estimated_completion_date,
      order_info.completion_date,
      order_info.additional_requests_completed AS order_completed,
      GROUP_CONCAT(
        JSON_OBJECT(
          'order_service_id', order_services.order_service_id,
          'service_id', order_services.service_id,
          'service_completed', order_services.service_completed
        )
        SEPARATOR ','
      ) AS order_services
    FROM orders
    INNER JOIN order_info ON orders.order_id = order_info.order_id
    INNER JOIN order_status ON orders.order_id = order_status.order_id
    INNER JOIN order_services ON orders.order_id = order_services.order_id
    WHERE orders.order_id = ?
    GROUP BY orders.order_id;
  `;
     ;
  try {
    const rows = await conn.query(query, [order_id]);
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
module.exports = {
  addNewOrder,
  getAllOrders,
  getOrderById,
};
