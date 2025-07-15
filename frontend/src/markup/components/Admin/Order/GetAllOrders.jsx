import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../../../../Context/AuthContext";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegEdit } from "react-icons/fa";
import { getAllOrders } from "../../../../services/order.service";
import customerService from "../../../../services/customer.service";
import vehicleService from "../../../../services/vehicle.service";
import employeeService from "../../../../services/employee.service";
import { FaExternalLinkAlt } from "react-icons/fa";

// Create the ListAllOrders component
const ListAllOrders = () => {
	// States
	const [orders, setOrders] = useState([]);
	const [customers, setCustomers] = useState({});
	const [vehicles, setVehicles] = useState({});
	const [employees, setEmployees] = useState({});
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { employee } = useAuth();
	const token = employee ? employee.employee_token : null;

	const handleShow = (order) => {
		console.log(order); // For debugging purpose
	};

	useEffect(() => {
		if (!token) {
			setApiError(true);
			setApiErrorMessage("User is not authenticated.");
			setIsLoading(false);
			return;
		}

		// Fetch all orders
		getAllOrders(token)
			.then((res) => {
				if (!res.ok) {
					setApiError(true);
					setApiErrorMessage(
						res.status === 401
							? "Please login again."
							: res.status === 403
							? "You are not authorized to view this page."
							: "Please try again later."
					);
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				if (data.data && data.data.length !== 0) {
					setOrders(data.data);

					// Fetch unique customer, vehicle, and employee details
					const uniqueCustomerIds = Array.from(
						new Set(data.data.map((order) => order.customer_id))
					);
					uniqueCustomerIds.forEach((customer_id) => {
						customerService
							.getCustomerById(token, customer_id)
							.then((customerData) => {
								setCustomers((prevCustomers) => ({
									...prevCustomers,
									[customer_id]: customerData.data,
								}));
							});
					});

					const uniqueVehicleIds = Array.from(
						new Set(data.data.map((order) => order.vehicle_id))
					);
					uniqueVehicleIds.forEach((vehicle_id) => {
						vehicleService
							.GetVehicleById(token, vehicle_id)
							.then((vehicleData) => {
								setVehicles((prevVehicles) => ({
									...prevVehicles,
									[vehicle_id]: vehicleData,
								}));
							});
					});

					const uniqueEmployeeIds = Array.from(
						new Set(data.data.map((order) => order.employee_id))
					);
					uniqueEmployeeIds.forEach((employeeId) => {
						employeeService
							.getEmployeeById(token, employeeId)
							.then((employeeData) => {
								setEmployees((prevEmployees) => ({
									...prevEmployees,
									[employeeId]: employeeData.data,
								}));
							});
					});
				} else {
					setApiError(true);
					setApiErrorMessage("No orders found.");
				}
				setIsLoading(false);
			})
			.catch((err) => {
				setApiError(true);
				setApiErrorMessage(
					"An unexpected error occurred. Please try again later."
				);
				setIsLoading(false);
				console.error(err);
			});
	}, [token]);

	// Filter orders to display only unique order IDs
	const uniqueOrders = [];
	const seenOrderIds = new Set();

	orders.forEach((order) => {
		if (!seenOrderIds.has(order.order_id)) {
			uniqueOrders.push(order); // Add order to uniqueOrders if not seen
			seenOrderIds.add(order.order_id); // Mark the order_id as seen
		}
	});

	return (
		<>
			{isLoading ? (
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ height: "50vh" }}
				>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			) : apiError ? (
				<section className="contact-section">
					<div className="auto-container">
						<Alert variant="danger">
							<h2>{apiErrorMessage}</h2>
						</Alert>
					</div>
				</section>
			) : (
				<>
					<section className="contact-section">
						<div className="auto-container">
							<div className="contact-title mb-4">
								<h2>Orders</h2>
							</div>
							<Table striped bordered hover responsive>
								<thead>
									<tr className="text-center">
										<th>Order Id</th>
										<th>Customer Name</th>
										<th>Vehicle</th>
										<th>Order Date</th>
										<th>Received By</th>
										<th>Order Status</th>
										<th>Edit/View</th>
									</tr>
								</thead>
								<tbody>
									{uniqueOrders.map((order) => (
										<tr key={order.order_id}>
											<td>{order.order_id}</td>
											<td>
												{customers[order.customer_id] ? (
													<>
														{customers[order.customer_id].customer_first_name}{" "}
														{customers[order.customer_id].customer_last_name}
														<br />
														{customers[order.customer_id].customer_email}
														<br />
														{customers[order.customer_id].customer_phone_number}
													</>
												) : (
													"Loading..."
												)}
											</td>
											<td>
												{vehicles[order.vehicle_id]
													? `${vehicles[order.vehicle_id].vehicle_model} (${
															vehicles[order.vehicle_id].vehicle_year
													  })`
													: "Loading..."}
											</td>
											<td>
												{format(new Date(order.order_date), "MM-dd-yyyy")}
											</td>
											<td>
												{employees[order.employee_id]
													? `${
															employees[order.employee_id].employee_first_name
													  } ${
															employees[order.employee_id].employee_last_name
													  }`
													: "Loading..."}
											</td>
											<td
												style={
													order.order_status === "Delivered"
														? styles.completed
														: styles.progress
												}
											>
												{order.order_status || "Pending"}
											</td>
											<td>
												<div className="d-flex gap-2">
													<Link to={`/admin/order/${order.order_id}`}>
														<FaRegEdit size={20} color="black" />
													</Link>
													<Link to={`/admin/order/${order.order_id}`}>
														<FaExternalLinkAlt />
													</Link>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					</section>
				</>
			)}
		</>
	);
};
const styles = {
	progress: {
		backgroundColor: "orange",
		borderRadius: "50px",
		padding: "0.2rem 1rem",
		display: "inline-block",
		whiteSpace: "nowrap",
	},
	completed: {
		backgroundColor: "rgba(0, 128, 0, 0.5)",
		color: "#fff",
		borderRadius: "50px",
		padding: "0.2rem 1rem",
		display: "inline-block",
		whiteSpace: "nowrap",
	},
};

// Export the ListAllOrders component
export default ListAllOrders;
