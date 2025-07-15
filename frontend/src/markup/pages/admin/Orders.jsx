import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import ListAllOrders from "../../components/Admin/Order/GetAllOrders";

function ShowAllOrders(props) {
  return (
    <div>
      <div className="container-fluid admin pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <ListAllOrders/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAllOrders;
