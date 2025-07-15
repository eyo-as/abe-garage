import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import SelectService from "../../components/Admin/Order/ChooseService";
// import SelectService from "../../components/Admin/Order/chooseService";
import GetAllVehicles from "../../components/Admin/Vehicle/GetVehiclesByCustomerId";
import GetCustomerById from "../../components/Admin/customers/GetCustomerById/GetCustomerById";


const ChooseService = () => {
  return (
    <div>
      <div className="container-fluid admin pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            
            <SelectService />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseService;
