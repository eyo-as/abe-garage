import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import GetAllCustomers from "../../components/Admin/Order/GetAllCustomers";

function AddNewOrder(props) {
  return (
    <div>
      <div className="container-fluid admin pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <GetAllCustomers />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewOrder;
