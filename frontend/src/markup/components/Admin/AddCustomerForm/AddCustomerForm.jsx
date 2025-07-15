import React, { useState } from "react";
import axios from "axios";

function AddCustomerForm() {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [activeCustomerStatus, setActiveCustomerStatus] = useState(1);

  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!customerFirstName) {
      setFirstNameError("First name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!customerLastName) {
      setLastNameError("Last name is required");
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!customerEmail) {
      setEmailError("Email is required");
      valid = false;
    } else if (!customerEmail.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!valid) {
      return;
    }

    const formData = {
      customer_first_name: customerFirstName,
      customer_last_name: customerLastName,
      customer_email: customerEmail,
      customer_phone_number: customerPhoneNumber,
      active_customer_status: activeCustomerStatus,
      customer_hash: "random_hash_value",
      customer_added_date: new Date().toISOString().split("T")[0], // Format date as yyyy-mm-dd
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/customer",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_BEARER_TOKEN`, // Replace with actual token if needed
          },
        }
      );
      console.log("Response from API:", response.data);

      if (response.data.success) {
        setSuccess(true);
        setServerError("");
        setTimeout(() => {
          window.location.href = "/admin/customers";
        }, 2000);
      } else {
        setServerError(response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      setServerError(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container ml-5">
        <div className="contact-title">
          <h2>Add a new customer</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                {serverError && (
                  <div className="validation-error" role="alert">
                    {serverError}
                  </div>
                )}
                {success && (
                  <div className="success-message m-3" role="alert">
                    Customer added successfully!
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="customer_email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="Customer email"
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        value={customerFirstName}
                        onChange={(e) => setCustomerFirstName(e.target.value)}
                        placeholder="Customer first name"
                      />
                      {firstNameError && (
                        <div className="validation-error" role="alert">
                          {firstNameError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        value={customerLastName}
                        onChange={(e) => setCustomerLastName(e.target.value)}
                        placeholder="Customer last name"
                      />
                      {lastNameError && (
                        <div className="validation-error" role="alert">
                          {lastNameError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone"
                        value={customerPhoneNumber}
                        onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                        placeholder="Customer phone"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add customer</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCustomerForm;
