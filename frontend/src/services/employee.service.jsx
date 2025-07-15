// Import from the env
const api_url = import.meta.env.VITE_API_URL;

// A function to send post request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};

const updateEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  console.log(requestOptions);
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};

// A function to send get request to get all employees
const getAllEmployees = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  return response;
};

const getEmployeeById = async (token, id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/employee/${id}`, requestOptions);
  return response.json(); // Return the JSON response
};

const deleteEmployee = async (token, id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  console.log(requestOptions);
  const response = await fetch(`${api_url}/api/employee/${id}`, requestOptions);

  // Parse the JSON response to get the full employee info
  const data = await response.json();
  return data;
};

// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
export default employeeService;
