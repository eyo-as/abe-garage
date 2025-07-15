// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the employee model
// const bcrypt = require("bcrypt");

// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);
  // console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new employee
async function createEmployee(employee) {
  let createdEmployee = {};
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
    // Insert the email in to the employee table
    const query =
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
    const rows = await conn.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);
    // console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the employee id from the insert
    const employee_id = rows.insertId;
    // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);
    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    const rows3 = await conn.query(query3, [employee_id, hashedPassword]);
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const rows4 = await conn.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);
    // construct to the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
  return createdEmployee;
}
// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  return rows;
}
// A function to get employee by id
async function getEmployeeById(employee_id) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_id = ?";
  const rows = await conn.query(query, [employee_id]);
  return rows;
}
// A function to get a password by email
async function getEmployeePassword(employee_id) {
  const query =
    // sellect also password hashed where employee_id
    "SELECT * FROM employee_pass WHERE employee_id = ?";
  const rows = await conn.query(query, [employee_id]);
  return rows;
}
// A function to get all employees
async function getAllEmployees() {
  const query =
    // sellect also password hashed
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10";
  const rows = await conn.query(query);
  return rows;
}

// A function to delete an employee
async function deleteEmployee(employeeId) {
  try {
    await conn.query("DELETE FROM employee_role WHERE employee_id = ?", [
      employeeId,
    ]);
    await conn.query("DELETE FROM employee_pass WHERE employee_id = ?", [
      employeeId,
    ]);
    await conn.query("DELETE FROM employee_info WHERE employee_id = ?", [
      employeeId,
    ]);
    await conn.query("DELETE FROM employee WHERE employee_id = ?", [
      employeeId,
    ]);

    return true;
  } catch (err) {
    console.error("Error deleting employee:", err);
    throw new Error("Failed to delete employee");
  }
}
// A function to update an employee
async function updateEmployee(employee) {
  let updatedFields = {};
  let updatedEmployee = {};
// console.log(employee.employee_id)
  try {
    const original_employee_data = await getEmployeeById(
      employee.employee_id
    );
    if (!employee.employee_id) {
      throw new Error("Original id is required");
    }
// console.log(original_employee_data);
    // Retrieve the employee_id using the original id
    const selectQuery =
      "SELECT employee_id FROM employee WHERE employee_id = ?";
    const [existingEmployee] = await conn.query(selectQuery, [
      employee.employee_id,
    ]);

    if (!existingEmployee || existingEmployee.length === 0) {
      throw new Error("Employee not found");
    }

    const employee_id = existingEmployee.employee_id;

    updatedFields.employee_email = employee.employee_email;

    updatedFields.active_employee = employee.active_employee;

    updatedFields.employee_first_name = employee.employee_first_name;

    updatedFields.employee_last_name = employee.employee_last_name;

    updatedFields.employee_phone = employee.employee_phone;

    updatedFields.company_role_id = employee.company_role_id;

    // Handle password update
    if (
      employee.employee_password &&
      employee.employee_password !==
        original_employee_data[0].employee_password_hashed
    ) {
      // If the provided password is different from the original hashed password, hash the new password
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(
        employee.employee_password,
        salt
      );
      updatedFields.employee_password_hashed = hashedPassword;
    } else {
      updatedFields.employee_password_hashed =
        original_employee_data[0].employee_password_hashed;
    }

    // Update the employee table
    const updateEmployeeQuery = `
      UPDATE employee 
      SET employee_email = COALESCE(?, employee_email), 
          active_employee = COALESCE(?, active_employee) 
      WHERE employee_id = ?`;

    await conn.query(updateEmployeeQuery, [
      updatedFields.employee_email,
      updatedFields.active_employee,
      employee_id,
    ]);

    // Update the employee_info table
    const updateInfoQuery = `
      UPDATE employee_info 
      SET employee_first_name = COALESCE(?, employee_first_name), 
          employee_last_name = COALESCE(?, employee_last_name), 
          employee_phone = COALESCE(?, employee_phone) 
      WHERE employee_id = ?`;

    await conn.query(updateInfoQuery, [
      updatedFields.employee_first_name,
      updatedFields.employee_last_name,
      updatedFields.employee_phone,
      employee_id,
    ]);

    // Update the employee password if it exists in updatedFields

    if (updatedFields.employee_password_hashed) {
      const updatePasswordQuery = `
        UPDATE employee_pass 
        SET employee_password_hashed = ? 
        WHERE employee_id = ?`;

      await conn.query(updatePasswordQuery, [
        updatedFields.employee_password_hashed,
        employee_id,
      ]);
    }

    // Update the employee role
    if (
      employee.company_role_id &&
      employee.company_role_id !== original_employee_data[0].company_role_id
    ) {
      const updateRoleQuery = `
        UPDATE employee_role 
        SET company_role_id = ? 
        WHERE employee_id = ?`;

      await conn.query(updateRoleQuery, [
        updatedFields.company_role_id,
        employee_id,
      ]);
    }

    // Return the updated fields
    updatedEmployee = { ...updatedFields, employee_id };
  } catch (err) {
    console.error("Update failed:", err.message);
  }

  return updatedEmployee;
}
// Export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  getEmployeePassword,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
};
