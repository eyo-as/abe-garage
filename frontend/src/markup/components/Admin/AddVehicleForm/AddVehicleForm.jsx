import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaArrowUpWideShort } from "react-icons/fa6";

const AddVehicleForm = () => {
  const { customerId } = useParams();
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleMileage, setVehicleMileage] = useState("");
  const [vehicleTag, setVehicleTag] = useState("");
  const [vehicleSerial, setVehicleSerial] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [show, setShow] = useState(false);

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate customerId
    console.log("handleSubmit:", { customerId });
    if (!customerId) {
      setServerError("Customer ID is missing.");
      return;
    }

    // Prepare form data
    const formData = {
      customer_id: customerId,
      vehicle_model: vehicleModel,
      vehicle_year: vehicleYear,
      vehicle_make: vehicleMake,
      vehicle_type: vehicleType,
      vehicle_mileage: vehicleMileage,
      vehicle_tag: vehicleTag,
      vehicle_serial: vehicleSerial,
      vehicle_color: vehicleColor,
    };

    try {
      // Make the request to your API
      console.log("handleSubmit: making request to API...");
      const response = await axios.post(
        `http://localhost:8000/api/vehicle`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_BEARER_TOKEN`,
          },
        }
      );

      // Check the response structure
      console.log("handleSubmit: response:", response);
      if (response.status === 201 && response.data.success) {
        setSuccess(true);
        setServerError("");
        setTimeout(() => {
          window.location.href = `/admin/customer/profile/${customerId}`;
        }, 2000);
      } else {
        setServerError(response.data.message || "Unknown error");
      }
    } catch (error) {
      console.log("handleSubmit: error:", error);
      setServerError(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
    setShow(false);
  };

  const showAddVehicle = () => {
    setShow(true);
  };

  return (
    <>
      {!show ? (
        <div className="form-group col-md-12">
          <button
            type="submit"
            onClick={showAddVehicle}
            style={{
													width: "200px",
													fontSize: "20px",
													fontWeight: "bold",
													backgroundColor: "#e74c3c",
													color: "#fff",
													border: "none",
													padding: "10px 20px",
													cursor: "pointer",
													borderRadius: "4px",
													marginLeft: 0,
            }}
												className="add_vehicle_btn"
          >
            Add Vehicle
          </button>
        </div>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title d-flex justify-content-between">
              <h2>Add New Vehicle</h2>
              <FaArrowUpWideShort
                style={{ cursor: "pointer", marginRight: "100px" }}
                size={30}
                onClick={() => setShow(false)}
              />
            </div>
            <div className="row clearfix">
              <div className="form-column col-lg-7">
                <div className="inner-column flex-row">
                  {serverError && (
                    <div className="validation-error" role="alert">
                      {serverError}
                    </div>
                  )}
                  {success && (
                    <div className="success-message m-3" role="alert">
                      Vehicle added successfully!
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                      <div className="form-group col-md-12 form-year">
                        <input
                          type="number"
                          value={vehicleYear}
                          onChange={(e) => setVehicleYear(e.target.value)}
                          style={{ width: "100%" }}
                          className="vehicle-form-control"
                          placeholder="Vehicle Year"
                          required
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={vehicleMake}
                          onChange={(e) => setVehicleMake(e.target.value)}
                          style={{ width: "100%" }}
                          className="vehicle-form-control"
                          placeholder="Vehicle Make"
                          required
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={vehicleModel}
                          onChange={(e) => setVehicleModel(e.target.value)}
                          style={{ width: "100%" }}
                          className="vehicle-form-control"
                          placeholder="Vehicle Model"
                          required
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={vehicleType}
                          onChange={(e) => setVehicleType(e.target.value)}
                          style={{ width: "100%" }}
                          className="vehicle-form-control"
                          placeholder="Vehicle Type"
                        />
                      </div>
                      <div className="form-group col-md-12 form-year">
                        <input
                          type="number"
                          value={vehicleMileage}
                          onChange={(e) => setVehicleMileage(e.target.value)}
                          style={{ width: "100%" }}
                          className="vehicle-form-control"
                          placeholder="Vehicle Mileage"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={vehicleTag}
                          onChange={(e) => setVehicleTag(e.target.value)}
                          style={{ width: "100%" }}
                          className="vehicle-form-control"
                          placeholder="Vehicle Tag"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={vehicleSerial}
                          onChange={(e) => setVehicleSerial(e.target.value)}
                          style={{ width: "100%" }}
                          className="vehicle-form-control"
                          placeholder="Vehicle Serial"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={vehicleColor}
                          onChange={(e) => setVehicleColor(e.target.value)}
                          style={{ width: "100%" }}
                          className="vehicle-form-control"
                          placeholder="Vehicle Color"
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          width: "200px",
                          height: "70px",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Add Vehicle
                      </button>
                      <br />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AddVehicleForm;
