import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Context/AuthContext";
import classes from "./ServiceUpdate.module.css";
import BarLoader from "react-spinners/BarLoader"; // Ensure this is installed

const ServiceUpdate = ({ selectedService }) => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  const [formData, setFormData] = useState({
    service_name: "",
    service_description: "",
  });

  const [initialData, setInitialData] = useState(null); // Store the initial fetched data
  const [inputErrors, setInputErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFetchingService, setIsFetchingService] = useState(true);
  const [showConfirmUpdateModal, setShowConfirmUpdateModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Fetch service details by ID if selectedService is not provided
  useEffect(() => {
    const fetchServiceById = async () => {
      if (!selectedService && serviceId) {
        try {
          const response = await serviceService.getServiceById(
            token,
            serviceId
          );
          if (response.error) {
            throw new Error(response.error);
          }

          const serviceData = {
            service_name: response.service_name || "",
            service_description: response.service_description || "",
          };

          setFormData(serviceData);
          setInitialData(serviceData); // Set the initial data
        } catch (error) {
          setErrorMessage("Failed to load service details.");
        } finally {
          setIsFetchingService(false);
        }
      } else if (selectedService) {
        const serviceData = {
          service_name: selectedService.service_name || "",
          service_description: selectedService.service_description || "",
        };

        setFormData(serviceData);
        setInitialData(serviceData); // Set the initial data
        setIsFetchingService(false);
      }
    };

    fetchServiceById();
  }, [selectedService, serviceId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Clear error for the edited field
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    const newInputErrors = {};
    if (!formData.service_name) newInputErrors.service_name = true;
    if (!formData.service_description)
      newInputErrors.service_description = true;

    if (Object.keys(newInputErrors).length > 0) {
      setInputErrors(newInputErrors);
      return;
    }

    // Show confirmation modal before updating
    setShowConfirmUpdateModal(true);
  };

  const confirmUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await serviceService.updateService(
        selectedService?.service_id || serviceId,
        formData,
        token
      );
      if (response.error) {
        throw new Error(response.error);
      }

      navigate("/admin/services"); // Navigate after successful update
    } catch (error) {
      setErrorMessage(error.message || "Failed to update service.");
    } finally {
      setIsLoading(false);
      setShowConfirmUpdateModal(false); // Close modal after update
    }
  };

  // Compare current formData with initialData to check for changes
  const hasChanges = () => {
    return (
      formData.service_name !== initialData?.service_name ||
      formData.service_description !== initialData?.service_description
    );
  };

  const handleCancelUpdate = () => {
    if (hasChanges()) {
      setShowCancelModal(true); // Show cancel confirmation modal if there are changes
    } else {
      navigate(-1); // Navigate back without showing the modal if no changes
    }
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    navigate(-1); // Go back to the previous page
  };

  if (isFetchingService) {
    return <div>Loading service details...</div>; // Show a loader while fetching service details
  }

  return (
    <div className={classes.serviceUpdateContainer}>
      <h2>Edit Service: {formData.service_name}</h2>
      <h4>Service ID: {selectedService?.service_id || serviceId}</h4>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="serviceName">Service Name</label>
          <input
            type="text"
            id="serviceName"
            name="service_name"
            value={formData.service_name}
            onChange={handleChange}
            className={inputErrors.service_name ? classes.errorInput : ""}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="serviceDescription">Service Description</label>
          <input
            type="text"
            id="serviceDescription"
            name="service_description"
            value={formData.service_description}
            onChange={handleChange}
            className={
              inputErrors.service_description ? classes.errorInput : ""
            }
            required
          />
        </div>

        {errorMessage && (
          <div className={classes.errorMessage}>{errorMessage}</div>
        )}

        <div className={classes.formActions}>
          <button
            type="button"
            className={classes.cancelButton}
            onClick={handleCancelUpdate}
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

      {/* Confirm Update Modal */}
      {showConfirmUpdateModal && (
        <div className="modal">
          <div className="modal-content w-50">
            <h3>Confirm Update</h3>
            <p>
              Are you sure you want to update the service{" "}
              <strong>{formData?.service_name}</strong>?
            </p>
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "45px",
              }}
              className="confirm-button"
              onClick={confirmUpdate}
            >
              {isLoading ? <BarLoader color="#f9c305" /> : "Yes, Update"}
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowConfirmUpdateModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Cancel Update Confirmation Modal */}
      {showCancelModal && (
        <div className="modal">
          <div className="modal-content w-50">
            <h3>Cancel Update</h3>
            <p>
              Are you sure you want to cancel the update process? You will lose
              all changes.
            </p>
            <button
              className="confirm-button"
              onClick={confirmCancel}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "45px",
              }}
            >
              Yes, Cancel
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowCancelModal(false)}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceUpdate;
