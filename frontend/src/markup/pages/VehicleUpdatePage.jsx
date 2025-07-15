import React from "react";
import AdminMenu from "../components/Admin/AdminMenu/AdminMenu";
import UpdateVehicle from "../components/Admin/Vehicle/update-vehicle/UpdateVehicle";

const VehicleUpdatePage = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side px-0">
            <UpdateVehicle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleUpdatePage;
