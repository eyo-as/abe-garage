import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import employeeService from "../../../../services/employee.service";
import BarLoader from "react-spinners/BarLoader";

const EmployeeUpdate = ({ selectedEmployee, loggedInEmployeeToken }) => {
  const [formData, setFormData] = useState({
    employee_email: selectedEmployee.employee_email,
    employee_first_name: selectedEmployee.employee_first_name,
    employee_last_name: selectedEmployee.employee_last_name,
    employee_phone: selectedEmployee.employee_phone,
    employee_password: "",
    active_employee: selectedEmployee.active_employee,
    company_role_id: selectedEmployee.company_role_id,
    employee_id: selectedEmployee.employee_id,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!formData.employee_first_name)
      newErrors.employee_first_name = "First name is required";
    if (!formData.employee_last_name)
      newErrors.employee_last_name = "Last name is required";
    if (!formData.employee_phone)
      newErrors.employee_phone = "Phone number is required";
    if (!formData.company_role_id)
      newErrors.company_role_id = "Role is required";
    if (!formData.employee_email || !emailRegex.test(formData.employee_email)) {
      newErrors.employee_email = "Invalid email format";
    }
    if (
      !isChecked &&
      (!formData.employee_password || formData.employee_password.length < 6)
    ) {
      newErrors.employee_password =
        "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    const payload = {
      ...formData,
      employee_password: isChecked
        ? selectedEmployee.employee_password_hashed
        : formData.employee_password,
    };

    employeeService
      .updateEmployee(payload, loggedInEmployeeToken)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          setServerError("");

          // Delay redirect to show success message for a brief time
          setTimeout(() => {
            setIsLoading(false); // Reset the loading
            setSuccess(false); // Reset the success after the delay
            window.location.href = "/admin/employees";
          }, 2000); // 2 seconds before redirect
        }
      })
      .catch((error) => {
        const resMessage =
          error.response?.data?.message || error.message || error.toString();
        setServerError(resMessage);
        setIsLoading(false); // Ensure loading stops even on error
      });
  };

  return (
    <div className="container">
      <h3>
        Edit: {`${formData.employee_first_name} ${formData.employee_last_name}`}
      </h3>
      <br />
      <Form onSubmit={handleSaveChanges}>
        <Form.Group className="mb-3 d-flex justify-content-between w-50">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="employee_first_name"
            value={formData.employee_first_name}
            onChange={handleInputChange}
            style={{
              border: errors.employee_first_name ? "1px solid red" : "",
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-between w-50">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="employee_last_name"
            value={formData.employee_last_name}
            onChange={handleInputChange}
            style={{
              border: errors.employee_last_name ? "1px solid red" : "",
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-between w-50">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="employee_email"
            value={formData.employee_email}
            onChange={handleInputChange}
            style={{
              border: errors.employee_email ? "1px solid red" : "",
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-between w-50">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="employee_phone"
            value={formData.employee_phone}
            onChange={handleInputChange}
            style={{
              border: errors.employee_phone ? "1px solid red" : "",
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-between w-50">
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="company_role_id"
            value={formData.company_role_id}
            onChange={handleInputChange}
          >
            <option value="">Select The Company Role</option>
            <option value={1}>Employee</option>
            <option value={2}>Manager</option>
            <option value={3}>Admin</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Check
            type="checkbox"
            label="Use old password"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <Form.Control
            type="password"
            name="employee_password"
            value={
              isChecked
                ? selectedEmployee.employee_password_hashed
                : formData.employee_password
            }
            onChange={handleInputChange}
            disabled={isChecked}
            className="w-50"
            style={{
              border: errors.employee_password ? "1px solid red" : "",
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="active_employee"
            label="Is active customer"
            checked={formData.active_employee}
            onChange={(e) =>
              setFormData({ ...formData, active_employee: e.target.checked })
            }
          />
        </Form.Group>
        {serverError && <p style={{ color: "red" }}>{serverError}</p>}

        <Button
          variant="primary"
          type="submit"
          className="mb-5"
          disabled={isLoading}
        >
          {isLoading ? (
            <BarLoader color="#f9c305" height={5} />
          ) : success ? (
            "Update Successful"
          ) : (
            "Update"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default EmployeeUpdate;
