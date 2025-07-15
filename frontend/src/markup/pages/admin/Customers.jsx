import React from "react";
import CustomerList from "../../components/Admin/customers/get-all-customers/CustomerList";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

const Customers = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
