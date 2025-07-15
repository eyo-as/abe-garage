import React, { useState } from "react";

import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import GetAllVehicles from "../../components/Admin/Vehicle/GetVehiclesByCustomerId";
import GetCustomerById from "../../components/Admin/customers/GetCustomerById/GetCustomerById";

const GetVehiclesByCustomerId = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side px-0 contact-title">
            <h2 className="m-4 font-weight-bold">Create a new order</h2>
            <GetCustomerById />
            <GetAllVehicles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetVehiclesByCustomerId;
