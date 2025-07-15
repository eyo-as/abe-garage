const serviceService = require("../services/service.service");
// controllers/service.controller.js
async function addService(req, res, next) {
	try {
		const { service_name, service_description } = req.body;

		console.log("Request Body:", req.body); // Debugging line

		// Validate if both fields are provided
		if (!service_name || !service_description) {
			return res.status(400).json({
				error: "Bad Request",
				message: "Please provide all required fields",
			});
		}

		// Call the service to add the new service
		const newService = await serviceService.createService(
			service_name,
			service_description
		);

		if (!newService) {
			return res.status(400).json({
				error: "Bad Request",
				message: "Failed to create service",
			});
		}

		// Successful response
		res.status(201).json({
			message: "Service created successfully",
			success: true,
		});
	} catch (error) {
		console.error("Error creating service:", error); // Improved error logging
		res.status(500).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred.",
		});
	}
}

// Create the getAllServices controller
async function getAllServices(req, res, next) {
	// Call the getAlLServices method from the service service
	const services = await serviceService.getAllServices();
	if (!services) {
		res.status(400).json({
			error: "Failed to get all employees!",
		});
	} else {
		res.status(200).json({
			status: "success",
			data: services,
		});
	}
}

// Create the getServiceById controller
async function getServiceById(req, res, next) {
	try {
		const serviceId = req.params.id;
		const service = await serviceService.getServiceById(serviceId);

		if (!service) {
			return res.status(404).json({
				error: "Not Found",
				message: "Service with the specified ID not found.",
			});
		}

		res.status(200).json(service);
	} catch (error) {
		console.error("Error fetching service:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred.",
		});
	}
}

// Controller to update an existing service by service_id
async function updateService(req, res, next) {
  const { service_id } = req.params;
  const { service_name, service_description } = req.body;

  try {
    // Check for missing fields or invalid data
    if (!service_name || !service_description) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields.",
      });
    }

    // Call the service to update the service
    const updatedService = await serviceService.updateService(
      service_id,
      service_name,
      service_description
    );

    // Check if the service was found and updated
    if (!updatedService) {
      return res.status(404).json({
        error: "Not Found",
        message: `Service with ID ${service_id} not found.`,
      });
    }

    // Successful response
    res.status(200).json({
      message: "Service updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating service:", error);

    // Known error handling for authorization issues
    if (error.status === 403) {
      return res.status(403).json({
        message: "You are not authorized to update this service.",
      });
    }

    // Handling JWT-related authorization errors
    if (error.status === 401) {
      return res.status(401).json({
        message: "Invalid or missing JWT token.",
      });
    }

    // Return an unexpected error
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}


async function deleteService(req, res, next) {
	try {
		const serviceId = req.params.id;

		// Delete the Service
		await serviceService.deleteService(serviceId);

		return res.status(200).json({
			message: "Service deleted successfully",
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

module.exports = {
	addService,
	getAllServices,
	getServiceById,
	updateService,
	deleteService,
};
