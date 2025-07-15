const vehicleService = require("../services/vehicle.service");

async function addVehicle(req, res) {
  try {
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
    } = req.body;

    // Validate required fields
    if (
      !customer_id ||
      !vehicle_model ||
      !vehicle_year ||
      !vehicle_make ||
      !vehicle_type ||
      !vehicle_mileage ||
      !vehicle_tag ||
      !vehicle_serial ||
      !vehicle_color
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    await vehicleService.addVehicle(req.body);

    res.status(201).json({
      message: "Vehicle created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
async function getVehicleById(req, res, next) {
  try {
    const vehicle_id = req.params.id;
    const Vehicle = await vehicleService.getVehicleById(vehicle_id);
    console.log(Vehicle);
    if (!Vehicle) {
      return res.status(404).json({
        error: "Not Found",
        message: "Service with the specified ID not found.",
      });
    }

    res.status(200).json(Vehicle);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Backend function to handle GET request
async function getAllVehiclesPerCustomer(req, res) {
  const customer_id = req.params.customer_id; // Get from URL params, not from the body

  try {
    if (!customer_id) {
      return res.status(400).json({ error: "Customer ID is required" });
    }
    console.log(customer_id);

    const vehicles = await vehicleService.getAllVehiclesByCustomerId(
      customer_id
    );
    if (!vehicles) {
      return res.status(404).json({
        error: "Vehicles not found",
      });
    }

    res.status(200).json({
      customer_id: customer_id,
      vehicles: vehicles,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
// delete vehicle
async function deleteVehicle(req, res) {
  try {
    const vehicle_id = req.params.id;

    if (!vehicle_id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Vehicle ID is required",
      });
    }

    const result = await vehicleService.deleteVehicle(vehicle_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "Vehicle with the specified ID not found.",
      });
    }

    res.status(200).json({
      message: "Vehicle deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// update vehicle
const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const {
      vehicle_model,
      vehicle_year,
      vehicle_make,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    } = req.body;

    // Validate all required fields
    if (
      !vehicleId ||
      !vehicle_model ||
      !vehicle_year ||
      !vehicle_make ||
      !vehicle_type ||
      !vehicle_mileage ||
      !vehicle_tag ||
      !vehicle_serial ||
      !vehicle_color
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields.",
      });
    }

    const updatedVehicle = await vehicleService.updateVehicle(vehicleId, {
      vehicle_model,
      vehicle_year,
      vehicle_make,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    });

    if (!updatedVehicle) {
      return res.status(404).json({
        error: "Not Found",
        message: "Vehicle with the specified ID not found.",
      });
    }

    res.status(200).json({
      message: "Vehicle updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

//getVehicleById
module.exports = {
  addVehicle,
  getVehicleById,
  getAllVehiclesPerCustomer,
  deleteVehicle,
  updateVehicle,
};
