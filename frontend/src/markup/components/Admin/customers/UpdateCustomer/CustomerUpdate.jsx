import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customerService from "../../../../../services/customer.service";
import { useAuth } from "../../../../../Context/AuthContext";
import classes from "./CustomerUpdate.module.css";

const CustomerUpdate = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  const [formData, setFormData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_email: "",
    customer_phone_number: "",
    active_customer_status: false,
  });

  const [inputErrors, setInputErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await customerService.getCustomerById(token, customerId);
        if (data.data) {
          setFormData({
            customer_first_name: data.data.customer_first_name || "",
            customer_last_name: data.data.customer_last_name || "",
            customer_email: data.data.customer_email || "",
            customer_phone_number: data.data.customer_phone_number || "",
            active_customer_status: data.data.active_customer_status || false,
          });
        } else {
          throw new Error("Customer data not found.");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setErrorMessage(error.message || "Failed to load customer data.");
      }
    };

    fetchCustomerData();
  }, [customerId, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear the error for the field being edited
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check for empty fields
    const newInputErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (value === "") {
        newInputErrors[key] = true;
      }
    }

    if (Object.keys(newInputErrors).length > 0) {
      setInputErrors(newInputErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await customerService.updateCustomer(
        customerId,
        formData,
        token
      );
      if (!response.ok) {
        throw new Error("Failed to update customer. Please try again.");
      }

      navigate("/admin/customers");
    } catch (error) {
      setErrorMessage(error.message || "Failed to update customer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.customerUpdateContainer}>
      <h2>
        Edit: {formData.customer_first_name} {formData.customer_last_name}
      </h2>
      <h4>Customer email: {formData.customer_email}</h4>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="customerFirstName">First Name</label>
          <input
            type="text"
            id="customerFirstName"
            name="customer_first_name"
            value={formData.customer_first_name}
            onChange={handleChange}
            className={
              inputErrors.customer_first_name ? classes.errorInput : ""
            }
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="customerLastName">Last Name</label>
          <input
            type="text"
            id="customerLastName"
            name="customer_last_name"
            value={formData.customer_last_name}
            onChange={handleChange}
            className={inputErrors.customer_last_name ? classes.errorInput : ""}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="customerEmail">Email</label>
          <input
            type="email"
            id="customerEmail"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            className={inputErrors.customer_email ? classes.errorInput : ""}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="customerPhoneNumber">Phone Number</label>
          <input
            type="text"
            id="customerPhoneNumber"
            name="customer_phone_number"
            value={formData.customer_phone_number}
            onChange={handleChange}
            className={
              inputErrors.customer_phone_number ? classes.errorInput : ""
            }
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="customerActiveStatus">
            <input
              type="checkbox"
              id="customerActiveStatus"
              name="active_customer_status"
              checked={formData.active_customer_status}
              onChange={handleChange}
            />
            Is active customer
          </label>
        </div>

        {errorMessage && (
          <div className={classes.errorMessage}>{errorMessage}</div>
        )}

        <div className={classes.formActions}>
          <button
            type="button"
            className={classes.cancelButton}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={classes.updateButton}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerUpdate;
