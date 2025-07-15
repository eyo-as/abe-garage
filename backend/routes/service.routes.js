// Import express and create a router instance
const express = require("express");
const router = express.Router();

// Import the service controller
const serviceController = require("../controllers/service.controller");
// Import middleware for authentication
const authMiddleware = require("../middlewares/auth.middleware");

// Route to add a new service
router.post(
	"/api/services",
	[authMiddleware.verifyToken],
	serviceController.addService
);
// Create a route to handle the get all service
router.get(
	"/api/services",
	[authMiddleware.verifyToken, authMiddleware.isAdmin],
	serviceController.getAllServices
);
//  Route for getting a single service by ID
router.get(
	"/api/service/:id",
	[authMiddleware.verifyToken],
	serviceController.getServiceById
);
//Route to update an existing service by id
router.put(
  "/api/services/:service_id",
  [
    authMiddleware.verifyToken,
    authMiddleware.isAdmin || authMiddleware.isManager
  ],
  serviceController.updateService
);

// Route to handle the delete Service request on delete
router.get("/api/services/:id", serviceController.getServiceById);
router.delete("/api/services/:id", serviceController.deleteService);

module.exports = router;
