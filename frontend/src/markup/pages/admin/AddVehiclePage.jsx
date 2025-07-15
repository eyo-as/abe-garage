import React from "react";
import AddVehicleForm from "../../components/Admin/AddVehicleForm/AddVehicleForm";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

const AddVehiclePage = () => {
	return (
		<div>
			<div className="container-fluid admin pages">
				<div className="row">
					<div className="col-md-3 admin-left-side">
						<AdminMenu />
					</div>
					<div className="col-md-9 admin-right-side">
						<AddVehicleForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddVehiclePage;
