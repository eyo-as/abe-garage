import React, { useState } from "react";

import CustomerUpdate from "../../components/Admin/customers/UpdateCustomer/CustomerUpdate";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

const CustomerUpdatePage = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side px-0">
            <CustomerUpdate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerUpdatePage;
