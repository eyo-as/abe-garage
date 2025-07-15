import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import vehicleService from "../../../../../services/vehicle.service";
import { useAuth } from "../../../../../Context/AuthContext";

const UpdateVehicle = () => {
  const { vehicleId } = useParams();
  const { employee } = useAuth();
  const loggedInEmployeeToken = employee ? employee.employee_token : null;

  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [formState, setFormState] = useState({
    vehicle_model: "",
    vehicle_year: "",
    vehicle_make: "",
    vehicle_type: "",
    vehicle_mileage: "",
    vehicle_tag: "",
    vehicle_serial: "",
    vehicle_color: "",
  });

  // Fetch vehicle details on component mount
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await vehicleService.GetVehicleById(
          loggedInEmployeeToken,
          vehicleId
        );
        if (response) {
          setVehicleData(response);
          setFormState(response);
        } else {
          setUpdateError("Vehicle not found.");
        }
      } catch (error) {
        setUpdateError("An error occurred while fetching vehicle details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId, loggedInEmployeeToken]);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // Handle form submission for updating vehicle
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await vehicleService.updateVehicle(
        vehicleId,
        formState,
        loggedInEmployeeToken
      );

      if (response.status === 200) {
        // Handle successful update
        setSuccess(true);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        const errorData = await response.json();
        setUpdateError(
          errorData.message || "An error occurred while updating the vehicle."
        );
      }
    } catch (error) {
      setUpdateError("An unexpected error occurred.");
    }
  };

  if (isLoading) {
    return <div>Loading vehicle details...</div>;
  }

  if (updateError) {
    return <div>Error: {updateError}</div>;
  }

  return (
    <div className="container my-5">
      <div className="d-flex mb-4 mx-5 px-5">
        <h2 className="font-weight-bold">Update Vehicle</h2>
        <span
          style={{
            marginTop: "28px",
            marginLeft: "8px",
            width: "90px",
            height: "4px",
            backgroundColor: "red",
          }}
        ></span>
      </div>

      <form onSubmit={handleUpdateSubmit} className="container w-75">
        <div className="w-75 text-center pb-3">
          {success && (
            <div className="success-message" role="alert">
              Vehicle updated successfully!
            </div>
          )}
        </div>
        <div className="row my-3">
          <div className="col-md-3">
            <label htmlFor="vehicle_model">Model:</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              id="vehicle_model"
              name="vehicle_model"
              value={formState.vehicle_model}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3">
            <label htmlFor="vehicle_year">Year:</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              id="vehicle_year"
              name="vehicle_year"
              value={formState.vehicle_year}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3">
            <label htmlFor="vehicle_make">Make:</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              id="vehicle_make"
              name="vehicle_make"
              value={formState.vehicle_make}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3">
            <label htmlFor="vehicle_type">Type:</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              id="vehicle_type"
              name="vehicle_type"
              value={formState.vehicle_type}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3">
            <label htmlFor="vehicle_mileage">Mileage:</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              id="vehicle_mileage"
              name="vehicle_mileage"
              value={formState.vehicle_mileage}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3">
            <label htmlFor="vehicle_tag">Tag:</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              id="vehicle_tag"
              name="vehicle_tag"
              value={formState.vehicle_tag}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3">
            <label htmlFor="vehicle_serial">Serial:</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              id="vehicle_serial"
              name="vehicle_serial"
              value={formState.vehicle_serial}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3">
            <label htmlFor="vehicle_color">Color:</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              id="vehicle_color"
              name="vehicle_color"
              value={formState.vehicle_color}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
