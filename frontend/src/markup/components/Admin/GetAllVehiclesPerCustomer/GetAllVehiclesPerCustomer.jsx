import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegEdit, FaTrash } from "react-icons/fa"; // Added FaTrash for delete icon
import { useAuth } from "../../../../Context/AuthContext";
import vehicleService from "../../../../services/vehicle.service";

const GetAllVehiclesPerCustomer = ({ styles }) => {
  const { customerId } = useParams();
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllCustomerVehicles();
  }, [token, customerId]);

  const fetchAllCustomerVehicles = async () => {
    try {
      const response = await vehicleService.GetAllVehiclesPerCustomer(
        token,
        customerId
      );
      if (response && Array.isArray(response.vehicles)) {
        setVehicles(response.vehicles);
      } else {
        setError("Unexpected response format from the server.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        const response = await vehicleService.deleteVehicle(token, vehicleId);
        if (response.ok) {
          // Refresh the vehicle list after successful deletion
          fetchAllCustomerVehicles();
        } else {
          setError("Failed to delete the vehicle. Please try again.");
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (error) {
    return <div style={styles.noVehicles}>Error: {error}</div>;
  }

  if (vehicles.length === 0) {
    return (
      <div style={styles.noVehicles}>No vehicles found for this customer.</div>
    );
  }

  return (
    <div className="d-flex">
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.vehicle_id} className="vehicle-item">
            <div style={styles.section}>
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
              <div style={{ ...styles.buttonContainer, paddingRight: "70px" }}>
                <Link
                  to={`/admin/vehicle/${vehicle.vehicle_id}`}
                  style={styles.editButton}
                >
                  Edit Vehicle info <FaRegEdit color="red" />
                </Link>
                <Link
                  to={`/admin/customer/${customerId}/vehicle/${vehicle.vehicle_id}/delete`}
                  style={{ ...styles.editButton, display: "block" }}
                >
                  Delete Vehicle d<FaTrash color="red" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllVehiclesPerCustomer;
