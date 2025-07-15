// pages/AddCustomerPage.jsx
import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddCustomerForm from "../../components/Admin/AddCustomerForm/AddCustomerForm";

const AddCustomerPage = () => {
	return (
		<div>
			<div className="container-fluid admin pages">
				<div className="row">
					<div className="col-md-3 admin-left-side">
						<AdminMenu />
					</div>
					<div className="col-md-9 admin-right-side">
						<AddCustomerForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddCustomerPage;
