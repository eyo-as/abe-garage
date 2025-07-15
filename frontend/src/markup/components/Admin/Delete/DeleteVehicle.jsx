import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import vehicleService from "../../../../services/vehicle.service";
import { useAuth } from "../../../../Context/AuthContext";
import BarLoader from "react-spinners/BarLoader";

const DeleteVehicle = () => {
    const { id, customerId } = useParams();
    const { employee } = useAuth();
    const token = employee ? employee.employee_token : null;
    const navigate = useNavigate();

    const [vehicleData, setVehicleData] = useState(null);
    const [deletedVehicle, setDeletedVehicle] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState("");

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const data = await vehicleService.GetVehicleById(token, id);
                setVehicleData(data);
            } catch (error) {
                console.error("Error fetching vehicle data:", error);
            }
        };

        fetchVehicleData();
    }, [id, token]);

    const handleDelete = async () => {
        setShowModal(true);
    };

    const confirmDelete = async () => {
        setIsLoading("loading");
        try {
            if (vehicleData) {
                const response = await vehicleService.deleteVehicle(token, id);
                if (response.ok) {
                    setIsLoading("success");
                    setDeletedVehicle(vehicleData);
                    setTimeout(() => {
                        navigate(`/admin/customer/profile/${customerId}`);
                    }, 2000);
                }
            }
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        } finally {
            setShowModal(false);
        }
    };

    return (
        <section className="p-5 container">
            <h1 className="my-3 text-center">Delete Vehicle</h1>

            {vehicleData && (
                <table>
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Model</td>
                            <td>{vehicleData.vehicle_model}</td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td>{vehicleData.vehicle_year}</td>
                        </tr>
                        <tr>
                            <td>Make</td>
                            <td>{vehicleData.vehicle_make}</td>
                        </tr>
                        <tr>
                            <td>Color</td>
                            <td>{vehicleData.vehicle_color}</td>
                        </tr>
                        <tr>
                            <td>Tag</td>
                            <td>{vehicleData.vehicle_tag}</td>
                        </tr>
                    </tbody>
                </table>
            )}

            <div className="btn-container text-center d-flex justify-content-center gap-3 my-3">
                <button className="cancel-button">
                    <Link to={`/admin/customer/profile/${customerId}`}>Cancel Delete</Link>
                </button>

                <button className="delete-button" onClick={handleDelete}>
                    Delete Vehicle
                </button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content w-50">
                        <h3>Confirm Deletion</h3>
                        <p>
                            Are you sure you want to delete the vehicle{" "}
                            <strong>
                                {vehicleData.vehicle_year} {vehicleData.vehicle_make} {vehicleData.vehicle_model}
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

            {deletedVehicle && (
                <div className="deleted-info">
                    <h2>Deleted Vehicle Info</h2>
                    <p>
                        <strong>Model:</strong> {deletedVehicle.vehicle_model}
                    </p>
                    <p>
                        <strong>Year:</strong> {deletedVehicle.vehicle_year}
                    </p>
                    <p>
                        <strong>Make:</strong> {deletedVehicle.vehicle_make}
                    </p>
                    <p>
                        <strong>Color:</strong> {deletedVehicle.vehicle_color}
                    </p>
                    <p>
                        <strong>Tag:</strong> {deletedVehicle.vehicle_tag}
                    </p>
                </div>
            )}
        </section>
    );
};

export default DeleteVehicle;
