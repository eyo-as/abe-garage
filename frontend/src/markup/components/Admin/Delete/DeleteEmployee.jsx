import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Context/AuthContext";
import BarLoader from "react-spinners/BarLoader";

const DeleteEmployee = () => {
	const { id } = useParams();
	const { employee } = useAuth();
	const token = employee ? employee.employee_token : null;
	const navigate = useNavigate();

	const [employeeData, setEmployeeData] = useState(null);
	const [deletedEmployee, setDeletedEmployee] = useState(null);
	const [showModal, setShowModal] = useState(false); // To control modal visibility
	const [isLoading, setIsLoading] = useState("");

	// Fetch employee info before deletion
	useEffect(() => {
		const fetchEmployeeData = async () => {
			try {
				const data = await employeeService.getEmployeeById(token, id);
				setEmployeeData(data.data); // Store the employee info
			} catch (error) {
				console.error("Error fetching employee data:", error);
			}
		};

		fetchEmployeeData();
	}, [id, token]);

	const handleDelete = async () => {
		try {
			setShowModal(true);
		} catch (error) {
			console.error("Error deleting employee:", error);
		}
	};

	const confirmDelete = async () => {
		setIsLoading("loading");
		try {
			if (employeeData) {
				const data = await employeeService.deleteEmployee(token, id);
				if (data.success) {
					setIsLoading("success");

					setDeletedEmployee(data.data);
					setTimeout(() => {
						navigate("/admin/employees");
					}, 0);
				}
			}
		} catch (error) {
			console.error("Error deleting employee:", error);
		} finally {
			setShowModal(false);
		}
	};

	return (
		<section className="p-5 container">
			<h1 className="my-3 text-center">Delete Employee</h1>

			{employeeData && (
				<table>
					<thead>
						<tr>
							<th>Attribute</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>First Name</td>
							<td>{employeeData.employee_first_name}</td>
						</tr>
						<tr>
							<td>Last Name</td>
							<td>{employeeData.employee_last_name}</td>
						</tr>
						<tr>
							<td>Email</td>
							<td>{employeeData.employee_email}</td>
						</tr>
						<tr>
							<td>Phone</td>
							<td>{employeeData.employee_phone}</td>
						</tr>
						<tr>
							<td>Company Role ID</td>
							<td>{employeeData.company_role_id}</td>
						</tr>
					</tbody>
				</table>
			)}

			<div className="btn-container text-center d-flex justify-content-center gap-3 my-3">
				<button className="cancel-button">
					<Link to={`/admin/employees`}>Cancel Delete</Link>
				</button>

				<button className="delete-button" onClick={handleDelete}>
					Delete Employee
				</button>
			</div>

			{showModal && (
				<div className="modal">
					<div className="modal-content w-50">
						<h3>Confirm Deletion</h3>
						<p>
							Are you sure you want to delete{" "}
							<strong>
								{employeeData.employee_first_name}{" "}
								{employeeData.employee_last_name}
							</strong>
							?
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
								"deleted success"
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

			{deletedEmployee && (
				<div className="deleted-info">
					<h2>Deleted Employee Info</h2>
					<p>
						<strong>First Name:</strong> {deletedEmployee.employee_first_name}
					</p>
					<p>
						<strong>Last Name:</strong> {deletedEmployee.employee_last_name}
					</p>
					<p>
						<strong>Email:</strong> {deletedEmployee.employee_email}
					</p>
					<p>
						<strong>Phone:</strong> {deletedEmployee.employee_phone}
					</p>
					<p>
						<strong>Company Role ID:</strong> {deletedEmployee.company_role_id}
					</p>
				</div>
			)}
		</section>
	);
};

export default DeleteEmployee;
