const api_url = "http://localhost:8000"; // Your backend API URL

// Create a new vehicle
const createVehicle = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken, // Use token for authentication
    },
    body: JSON.stringify(formData), // Pass vehicle details
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
};
const GetAllVehiclesPerCustomer = async (token, customer_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Use token for authentication
    },
  };

  // Send customer_id in the URL, not in the body
  const response = await fetch(
    `${api_url}/api/vehicles/${customer_id}`,
    requestOptions
  );

  const data = await response.json(); // Make sure to parse the response
  return data; // Return parsed data
};
const GetVehicleById = async (token, vehicle_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Use token for authentication
    },
  };

  // Send customer_id in the URL, not in the body
  const response = await fetch(
    `${api_url}/api/vehicle/${vehicle_id}`,
    requestOptions
  );

  const data = await response.json(); // Make sure to parse the response
  return data; // Return parsed data
};

// Delete a vehicle
const deleteVehicle = async (token, vehicle_id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  const response = await fetch(
    `${api_url}/api/vehicle/${vehicle_id}`,
    requestOptions
  );
  return response;
};

// Update an existing vehicle
const updateVehicle = async (vehicleId, formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/api/vehicle/${vehicleId}`,
    requestOptions
  );
  return response;
};

const vehicleService = {
  createVehicle,
  GetAllVehiclesPerCustomer,
  GetVehicleById,
  deleteVehicle,
  // getVehicleById,
  updateVehicle,
};

export default vehicleService;
