const db = require("../config/db.config");

async function addVehicle(vehicleData) {
  const insertVehicleQuery = `
        INSERT INTO customer_vehicle_info
        (customer_id, vehicle_model, vehicle_year, vehicle_make, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const {
    customer_id,
    vehicle_model,
    vehicle_year,
    vehicle_make,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = vehicleData;

  const connection = await db.pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(insertVehicleQuery, [
      customer_id,
      vehicle_model,
      vehicle_year,
      vehicle_make,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    ]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.release();
  }
}
//get vehicle by id
async function getVehicleById(vehicle_id) {
  const sql = `
    SELECT vehicle_id, customer_id, vehicle_model, vehicle_year, vehicle_make, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color
    FROM customer_vehicle_info
    WHERE vehicle_id = ?
  `;

  // Call the query function from db
  const rows = await db.query(sql, [vehicle_id]);
  return rows[0] || null;
}

async function getAllVehiclesByCustomerId(customer_id) {
  const getVehicles = `SELECT * 
FROM customer_vehicle_info 
WHERE customer_id = ?;`;
  const rows = await db.query(getVehicles, [customer_id]);
  return rows || null;
}
// delete vehicle
async function deleteVehicle(vehicle_id) {
  const deleteVehicleQuery = `
    DELETE FROM customer_vehicle_info
    WHERE vehicle_id = ?
  `;

  const connection = await db.pool.getConnection();
  try {
    await connection.beginTransaction();

    const result = await connection.query(deleteVehicleQuery, [vehicle_id]);

    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.release();
  }
}

// update vehicle

async function updateVehicle(vehicleId, updateData) {
  const {
    vehicle_model,
    vehicle_year,
    vehicle_make,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = updateData;

  const updateVehicleQuery = `
    UPDATE customer_vehicle_info
    SET
      vehicle_model = ?,
      vehicle_year = ?,
      vehicle_make = ?,
      vehicle_type = ?,
      vehicle_mileage = ?,
      vehicle_tag = ?,
      vehicle_serial = ?,
      vehicle_color = ?
    WHERE vehicle_id = ?`;

  const connection = await db.pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(updateVehicleQuery, [
      vehicle_model,
      vehicle_year,
      vehicle_make,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
      vehicleId,
    ]);

    await connection.commit();

    if (result.affectedRows === 0) {
      return null; // No vehicle found to update
    }

    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  addVehicle,
  getVehicleById,
  getAllVehiclesByCustomerId,
  deleteVehicle,
  updateVehicle,
};
