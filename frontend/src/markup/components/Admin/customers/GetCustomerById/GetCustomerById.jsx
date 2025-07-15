import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa"; // Edit icon
import customerService from "../../../../../services/customer.service";
import { useAuth } from "../../../../../Context/AuthContext";

const GetCustomerById = () => {
  const { id } = useParams(); // Get customer ID from the URL
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const [show, setShow] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await customerService.getCustomerById(token, id);
        setCustomer(customerData.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (token && id) {
      fetchCustomer();
    }
  }, [token, id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!customer) {
    return <div>Loading...</div>;
  }

  if (!show) {
    return null; // Hide component when 'show' is false
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.customerDetails}>
          <h3 style={styles.customerName}>
            {customer.customer_first_name} {customer.customer_last_name}
          </h3>
          <p style={styles.customerInfo}>
            <strong>Email:</strong> {customer.customer_email}
          </p>
          <p style={styles.customerInfo}>
            <strong>Phone Number:</strong> {customer.customer_phone_number}
          </p>
          <p style={styles.customerInfo}>
            <strong>Active Customer:</strong>{" "}
            {customer.active_customer_status ? "Yes" : "No"}
          </p>
          <Link to={`/admin/customer/${id}`} style={styles.editLink}>
            Edit customer info <FaRegEdit color="red" />
          </Link>
        </div>
        <div style={styles.deleteButton}>
          <button onClick={() => setShow(!show)} style={styles.deleteIcon}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    margin: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    borderRadius: "8px",
  },
  customerDetails: {
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.5",
  },
  customerName: {
    fontSize: "24px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  customerInfo: {
    margin: "5px 0",
    fontSize: "16px",
  },
  deleteButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "16px",
    
  },
  editLink: {
    fontSize: "16px",
    color: "#222B48",
    fontWeight: "bold",
    textDecoration: "none",
    marginTop: "10px",
    display: "inline-flex",
    alignItems: "center",
  },
  
};

export default GetCustomerById;
