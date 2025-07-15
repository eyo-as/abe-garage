const db = require("../config/db.config");

async function addCustomer(customerData) {
  const insertCustomerIdentifierQuery = `
        INSERT INTO customer_identifier 
        (customer_email, customer_phone_number, customer_hash, customer_added_date) 
        VALUES (?, ?, ?, ?)`;

  const insertCustomerInfoQuery = `
        INSERT INTO customer_info 
        (customer_id, customer_first_name, customer_last_name, active_customer_status) 
        VALUES (?, ?, ?, ?)`;

  const {
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone_number,
    active_customer_status,
    customer_hash,
    customer_added_date,
  } = customerData;

  const connection = await db.pool.getConnection();
  try {
    await connection.beginTransaction();

    const [resultIdentifier] = await connection.query(
      insertCustomerIdentifierQuery,
      [
        customer_email,
        customer_phone_number,
        customer_hash,
        customer_added_date,
      ]
    );

    const customer_id = resultIdentifier.insertId;

    await connection.query(insertCustomerInfoQuery, [
      customer_id,
      customer_first_name,
      customer_last_name,
      active_customer_status,
    ]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.release();
  }
}

// a function to get all customers
async function getAllCustomers() {
  const connection = await db.pool.getConnection();
  try {
    const query =
      "SELECT * FROM customer_info JOIN customer_identifier ON customer_info.customer_id = customer_identifier.customer_id ORDER BY customer_info.customer_id DESC";
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    connection.release();
  }
}


async function getCustomerById(customer_id) {
  const query = `SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?`;
  const rows = await db.query(query, [customer_id]);
  return rows;
}

async function updateCustomer(customer) {
  let updatedFields = {};
  let updatedCustomer = {};

  try {
    // Ensure customer_id is provided
    if (!customer.customer_id) {
      throw new Error("Customer ID is required");
    }

    // Retrieve the original customer data
    const originalCustomerData = await getCustomerById(customer.customer_id);
    if (!originalCustomerData.length) {
      throw new Error("Customer not found");
    }

    // Prepare fields for update
    updatedFields.customer_first_name =
      customer.customer_first_name !== undefined
        ? customer.customer_first_name
        : originalCustomerData[0].customer_first_name;

    updatedFields.customer_last_name =
      customer.customer_last_name !== undefined
        ? customer.customer_last_name
        : originalCustomerData[0].customer_last_name;

    // Phone number and email are in the customer_identifier table
    updatedFields.customer_phone_number =
      customer.customer_phone_number !== undefined
        ? customer.customer_phone_number
        : originalCustomerData[0].customer_phone_number;

    updatedFields.customer_email =
      customer.customer_email !== undefined
        ? customer.customer_email
        : originalCustomerData[0].customer_email;

    // Handle active_customer_status based on checkbox
    updatedFields.active_customer_status = customer.active_customer_status
      ? 1
      : 0;

    // Update the customer_info table
    const updateInfoQuery = `
      UPDATE customer_info 
      SET customer_first_name = ?, 
          customer_last_name = ?, 
          active_customer_status = ? 
      WHERE customer_id = ?`;

    await db.query(updateInfoQuery, [
      updatedFields.customer_first_name,
      updatedFields.customer_last_name,
      updatedFields.active_customer_status,
      customer.customer_id,
    ]);

    // Update the customer_identifier table
    const updateIdentifierQuery = `
      UPDATE customer_identifier 
      SET customer_phone_number = ?, 
          customer_email = ? 
      WHERE customer_id = ?`;

    await db.query(updateIdentifierQuery, [
      updatedFields.customer_phone_number,
      updatedFields.customer_email,
      customer.customer_id,
    ]);

    // Return the updated fields
    updatedCustomer = { ...updatedFields, customer_id: customer.customer_id };
  } catch (err) {
    console.error("Update failed:", err.message);
    throw new Error("Failed to update customer");
  }

  return updatedCustomer;
}

module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
};

