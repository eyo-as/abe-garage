// Import the employee service
const employeeService = require("../services/employee.service");
// Create the add employee controller
async function createEmployee(req, res, next) {
  // Check if employee email already exists in the database
  const employeeExists = await employeeService.checkIfEmployeeExists(
    req.body.employee_email
  );
  // If employee exists, send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee!",
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      if (!employee) {
        res.status(400).json({
          error: "Failed to add the employee!",
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

// Create the getAllEmployees controller
async function getAllEmployees(req, res, next) {
  // Call the getAllEmployees method from the employee service
  const employees = await employeeService.getAllEmployees();
  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    });
  }
}

// Create the getEmployeeById controller
async function getEmployeeById(req, res, next) {
  const employeeId = req.params.id;
  // Call the getEmployeeById method from the employee service
  const employee = await employeeService.getEmployeeById(employeeId);
  if (!employee) {
    res.status(400).json({
      error: "Failed to get the employee!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employee[0],
    });
  }
}

// Create the deleteEmployee controller
async function deleteEmployee(req, res, next) {
  try {
    const employeeId = req.params.id;

    // Delete the employee
    await employeeService.deleteEmployee(employeeId);

    return res.status(200).json({
      message: "Employee deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Create the updateEmployee controller
async function updateEmployee(req, res, next) {
  try {
    // cauch the originnal id on the params
    const employee_id = req.body.employee_id;
    if (!employee_id) {
      return res.status(400).json({ error: "Original email is required" });
    }

    // Update the employee
    const employeeData = req.body;
    const updatedEmployee = await employeeService.updateEmployee(employeeData);
// console.log(updatedEmployee)
    if (!updatedEmployee.employee_id) {
      return res.status(400).json({ error: "Failed to update the employee!" });
    }

    return res
      .status(200)
      .json({ status: "success", employee_id: updatedEmployee.employee_id });
  } catch (err) {
    console.error("Update error:", err.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
}

// Export the createEmployee controller
module.exports = {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployeeById
};
