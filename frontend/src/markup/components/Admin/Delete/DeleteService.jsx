import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Context/AuthContext";
import BarLoader from "react-spinners/BarLoader";

function DeleteService() {
	const { id } = useParams();
	const { employee } = useAuth();
	const token = employee ? employee.employee_token : null;
	const navigate = useNavigate();

	const [serviceData, setServiceData] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [showModal, setShowModal] = useState(false); // To control modal visibility
	const [isLoading, setIsLoading] = useState("");

	// Fetch service data
	useEffect(() => {
		if (!token) return;

		const fetchServiceData = async () => {
			try {
				const response = await serviceService.getServiceById(token, id);
				if (response.error) {
					setErrorMessage(response.error);
					setServiceData(null);
					return;
				}
				setServiceData(response);
			} catch (error) {
				setErrorMessage("Error fetching service data");
				console.error("Error fetching service:", error);
			}
		};

		fetchServiceData();
	}, [id, token]);

	const handleDelete = async () => {
		setShowModal(true);
	};

	const confirmDelete = async () => {
		setIsLoading("loading");
		try {
			if (serviceData && token) {
				const data = await serviceService.DeleteService(token, id);
				if (data.success) {
					setIsLoading("success");
					setTimeout(() => {
						navigate("/admin/services");
					}, 1000);
				} else {
					setErrorMessage("Failed to delete service.");
				}
			}
		} catch (error) {
			console.error("Error deleting service:", error);
			setErrorMessage("An error occurred during deletion.");
			setIsLoading("error");
		} finally {
			setShowModal(false);
		}
	};

	return (
		<section className="p-5 container">
			<h1 className="my-3 text-center">Delete Service</h1>

			{/* Display error message if there's an issue */}
			{errorMessage ? (
				<p className="error-message">{errorMessage}</p>
			) : serviceData ? (
				<table>
					<thead>
						<tr>
							<th>Service Name</th>
							<th>Service Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{serviceData.service_name}</td>
							<td>{serviceData.service_description}</td>
						</tr>
					</tbody>
				</table>
			) : (
				<p>Loading service data...</p>
			)}

			<div className="btn-container text-center d-flex justify-content-center gap-3 my-3">
				<button className="cancel-button">
					<Link to={`/admin/services`}>Cancel Delete</Link>
				</button>

				<button className="delete-button" onClick={handleDelete}>
					Delete Service
				</button>
			</div>

			{showModal && (
				<div className="modal">
					<div className="modal-content w-50">
						<h3>Confirm Deletion</h3>
						<p>
							Are you sure you want to delete{" "}
							<strong>{serviceData?.service_name}</strong>?
						</p>
						<button
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "45px",
							}}
							className="confirm-button"
							onClick={confirmDelete}
						>
							{isLoading === "loading" ? (
								<BarLoader color="#f9c305" />
							) : isLoading === "success" ? (
								"Deleted successfully"
							) : (
								"Yes, Delete"
							)}
						</button>
						<button
							className="cancel-button"
							onClick={() => setShowModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</section>
	);
}

export default DeleteService;
