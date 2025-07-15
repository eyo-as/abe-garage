import React, { useState } from "react";
import serviceService from "../../../../services/service.service"; // Updated import
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";

function AddServiceForm() {
	const [serviceName, setServiceName] = useState("");
	const [serviceDescription, setServiceDescription] = useState("");
	const [nameError, setNameError] = useState("");
	const [descriptionError, setDescriptionError] = useState("");
	const [serverError, setServerError] = useState("");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	let loggedInEmployeeToken = "";
	// Destructure the auth hook and get the token
	const { employee } = useAuth();
	if (employee && employee.employee_token) {
		loggedInEmployeeToken = employee.employee_token;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		let valid = true;

		// Basic validation for required fields
		if (!serviceName) {
			setNameError("Service name is required");
			valid = false;
		} else {
			setNameError("");
		}

		if (!serviceDescription) {
			setDescriptionError("Service description is required");
			valid = false;
		} else {
			setDescriptionError("");
		}

		if (!valid) return;

		setLoading(true);

		const formData = {
			service_name: serviceName,
			service_description: serviceDescription,
		};

		try {
			const response = await serviceService.addService(
				formData,
				loggedInEmployeeToken
			); // Updated function call

			if (response.error) {
				setServerError(response.error);
			} else {
				setSuccess(true);
				setServerError("");
				setTimeout(() => {
					window.location.href = "/admin/services";
				}, 2000);
			}
		} catch (error) {
			setServerError(
				"There was a problem adding the service. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="service-section">
			<div
				className="container"
				style={{
					maxWidth: "800px",
					margin: "0 auto",
					padding: "20px",
					boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
					borderRadius: "8px",
					marginBottom: "30px",
				}}
			>
				<div className="service-title">
					<h2>Add a new service</h2>
				</div>
				<div className="row clearfix">
					<div className="form-column col-lg-12">
						<div className="inner-column">
							<div className="service-form">
								{serverError && (
									<div className="validation-error" role="alert">
										{serverError}
									</div>
								)}
								{success && (
									<div className="success-message m-3" role="alert">
										Service added successfully!
									</div>
								)}
								<form onSubmit={handleSubmit}>
									<div className="row clearfix">
										<div className="form-group col-md-12">
											<input
												type="text"
												name="service_name"
												value={serviceName}
												onChange={(e) => setServiceName(e.target.value)}
												placeholder="Service name"
												style={{
													width: "100%", // Set width to 100%
													border: "1px solid #ced4da", // Same border style
													borderRadius: "4px", // Rounded corners for both
													padding: "0.375rem 0.75rem", // Padding inside the field
													boxSizing: "border-box", // Include border in width calculation
												}}
											/>
											{nameError && (
												<div className="validation-error" role="alert">
													{nameError}
												</div>
											)}
										</div>
										<div
											className="form-group col-md-12"
											style={{ marginTop: "20px" }}
										>
											<textarea
												name="service_description"
												value={serviceDescription}
												onChange={(e) => setServiceDescription(e.target.value)}
												placeholder="Service description"
												style={{
													width: "100%", // Set width to 100%
													height: "150px", // Increase height for larger textarea
													border: "1px solid #ced4da", // Same border style
													borderRadius: "4px", // Rounded corners for both
													padding: "0.375rem 0.75rem", // Padding inside the field
													boxSizing: "border-box", // Include border in width calculation
												}}
											/>
											{descriptionError && (
												<div className="validation-error" role="alert">
													{descriptionError}
												</div>
											)}
										</div>
										<div
											className="form-group col-md-12"
											style={{ marginTop: "20px" }}
										>
											<button
												className="theme-btn btn-style-one"
												type="submit"
												disabled={loading}
												data-loading-text="Please wait..."
											>
												{loading ? "Adding..." : "Add Service"}
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

export default AddServiceForm;
