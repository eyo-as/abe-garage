import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../../../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // Import the updated hook
import { format } from "date-fns";
import employeeService from "../../../../services/employee.service";
import EmployeeUpdate from "../UpdateEmployeeForm/EmployeeUpdate";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegEdit } from "react-icons/fa";

// Create the EmployeesList component
const EmployeesList = () => {
  // States
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  // const navigate = useNavigate(); // Use the updated hook
  // console.log(employees)
  const handleClose = () => {
    setShow(false);
    setSelectedEmployee(null);
    // navigate("/employees"); // Reset the URL when the modal is closed
  };

  const handleShow = (emp) => {
    setShow(true);
    setSelectedEmployee(emp);
    // navigate(`/employees/${emp.employee_id}`); // Update the URL when the modal is shown
  };

  useEffect(() => {
    if (!token) {
      setApiError(true);
      setApiErrorMessage("User is not authenticated.");
      setIsLoading(false);
      return;
    }

    // Fetch all employees
    employeeService
      .getAllEmployees(token)
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login again.");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page.");
          } else {
            setApiErrorMessage("Please try again later.");
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.data && data.data.length !== 0) {
          setEmployees(data.data);
        } else {
          setApiError(true);
          setApiErrorMessage("No employees found.");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (!apiError) {
          setApiError(true);
          setApiErrorMessage(
            "An unexpected error occurred. Please try again later."
          );
        }
        setIsLoading(false);
        console.error(err);
      });
  }, [token, apiError]);

  return (
    <>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <Alert variant="danger">
              <h2>{apiErrorMessage}</h2>
            </Alert>
          </div>
        </section>
      ) : (
        !selectedEmployee && (
          <>
            <section className="contact-section">
              <div className="auto-container">
                <div className="contact-title mb-4">
                  <h2>Employees</h2>
                </div>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Active</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Added Date</th>
                      <th>Role</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp.employee_id}>
                        <td>{emp.active_employee ? "Yes" : "No"}</td>
                        <td>{emp.employee_first_name}</td>
                        <td>{emp.employee_last_name}</td>
                        <td>{emp.employee_email}</td>
                        <td>{emp.employee_phone}</td>
                        <td>
                          {format(
                            new Date(emp.added_date),
                            "MM-dd-yyyy | HH:mm"
                          )}
                        </td>
                        <td>{emp.company_role_name}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleShow(emp)}
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                              }}
                            >
                              <FaRegEdit size={20} color="black" />
                            </Button>
                            <Link to={`/admin/employee/${emp.employee_id}`}>
                              <DeleteIcon />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </section>

            {/* Edit Employee Modal */}
            {/* pass also token */}
          </>
        )
      )}
      {selectedEmployee && (
        <EmployeeUpdate
          show={show}
          loggedInEmployeeToken={token}
          handleClose={handleClose}
          selectedEmployee={selectedEmployee}
        />
      )}
    </>
  );
};

// Export the EmployeesList component
export default EmployeesList;
