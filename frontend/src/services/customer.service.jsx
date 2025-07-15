// Import from the env
const api_url = import.meta.env.VITE_API_URL;

// A function to send post request to create a new customer
const createCustomer = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  return response;
};

// A function to send get request to get all customers
const getAllCustomers = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/customers`, requestOptions);
  return response;
};

const getCustomerById = async (token, id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/customer/${id}`, requestOptions);
  return response.json(); // Return the JSON response
};

const updateCustomer = async (customerId, formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify({ customer_id: customerId, ...formData }), // Include customerId in the body
  };
  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  return response;
};

// Export all the functions
const customerService = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  getCustomerById,
};
export default customerService;
