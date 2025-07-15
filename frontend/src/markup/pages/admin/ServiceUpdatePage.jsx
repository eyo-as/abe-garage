import React from "react";
import ServiceUpdate from "../../components/Admin/UpdateService/ServiceUpdate"; // Import the ServiceUpdate component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu"; // Import the AdminMenu component

const ServiceUpdatePage = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu /> {/* Admin menu on the left */}
          </div>
          <div className="col-md-9 admin-right-side px-0">
            <ServiceUpdate /> {/* ServiceUpdate component on the right */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceUpdatePage;
