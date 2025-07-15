import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa"; // For the edit icon
import { useAuth } from "../../../../Context/AuthContext";
import vehicleService from "../../../../services/vehicle.service";

const GetVehicleById = () => {
  const { vehicleId } = useParams();
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const [show, setShow] = useState(true);
  const [vehicle, setVehicle] = useState(null); // Expect a single vehicle object
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await vehicleService.GetVehicleById(token, vehicleId);
        if (response) {
          setVehicle(response); // Set the vehicle data
        } else {
          setError("Unexpected response format from the server.");
        }
      } catch (err) {
        setError(err.message); // Set the error state
      }
    };

    if (token && vehicleId) {
      fetchVehicle(); // Call the fetch function
    }
  }, [token, vehicleId]);

  // Conditional rendering for error and vehicle data
  if (error) {
    return <div style={styles.noVehicles}>Error: {error}</div>;
  }

  if (!vehicle) {
    return <div style={styles.noVehicles}>Loading vehicle data...</div>;
  }
 if (!show) {
   return null; // Hide component when 'show' is false
 }
  return (
      <div style={styles.container}>
        <div style={styles.card} >
          <div style={styles.customerDetails}>
            <h2 style={styles.customerName}>{vehicle.vehicle_model}</h2>
            <p style={styles.customerInfo}>
              <strong>Vehicle Color:</strong> {vehicle.vehicle_color}
            </p>
            <p style={styles.customerInfo}>
              <strong>Vehicle Tag:</strong> {vehicle.vehicle_tag}
            </p>
            <p style={styles.customerInfo}>
              <strong>Vehicle Year:</strong> {vehicle.vehicle_year}
            </p>
            <p style={styles.customerInfo}>
              <strong>Vehicle Mileage:</strong> {vehicle.vehicle_mileage}
            </p>
            <p style={styles.customerInfo}>
              <strong>Vehicle Serial:</strong> {vehicle.vehicle_serial}
            </p>
            <Link
              to={`/admin/customer/${vehicleId}/vehicle/${vehicle.vehicle_id}/`}
              style={styles.editLink}
            >
              Edit Vehicle info <FaRegEdit color="red" />
            </Link>
          </div>
          <div style={styles.deleteButton}>
            <button onClick={() => setShow(!show)} style={styles.deleteIcon}>X</button>
          </div>
        </div>
    </div>
  );
};

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

export default GetVehicleById;
