import React, { useState, useEffect } from "react";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Context/AuthContext";
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import SearchService from "../SearchService/SearchService"; // Importing SearchService component

function ServiceList() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [filteredServices, setFilteredServices] = useState([]); // State for filtered services
  const [searchError, setSearchError] = useState(""); // State to hold search error message

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await serviceService.getService(token);
        const data = await servicesData.json();
        setServices(data.data);
        setFilteredServices(data.data); // Set initial filtered services
      } catch (err) {
        setError(err.message);
      }
    };
    loadServices();
  }, [token]);

  const handleSearch = (searchTerm) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = services.filter(
      (service) =>
        service.service_name.toLowerCase().includes(lowerCaseTerm) ||
        service.service_description.toLowerCase().includes(lowerCaseTerm) ||
        service.service_id.toString().includes(lowerCaseTerm)
    );

    setFilteredServices(filtered);

    // Show error message if no services match the search term
    if (filtered.length === 0) {
      setSearchError(
        "No matching services found. Please try a different search term or add a new service below."
      );
    } else {
      setSearchError(""); // Clear error if matches are found
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div
        className="container mb-5"
        style={{
          maxWidth: "800px",
        }}
      >
        <h2 className="contact-title my-3">Services we provide</h2>
        <small className="text">
          Bring to the table win-win survival strategies to ensure proactive
          domination. At the end of the day, going forward, a new normal that
          has evolved from generation X is on the runway heading towards a
          streamlined cloud solution.
        </small>
      </div>

      {/* SearchService Component */}
      <div className="container mb-4" style={{ maxWidth: "800px" }}>
        <SearchService onSearch={handleSearch} />
      </div>

      {/* Error Message for No Matching Services */}
      {searchError && (
        <div
          className="alert alert-warning text-center"
          style={{
            maxWidth: "800px",
            margin: "20px auto",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {searchError}
        </div>
      )}

      {
        filteredServices?.length > 0
          ? filteredServices.map((service) => (
              <div
                key={service.service_id}
                className="container"
                style={{
                  maxWidth: "800px",
                  margin: "0 auto",
                  padding: "20px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  marginBottom: "30px",
                }}
              >
                <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                  {service.service_name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <small
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      width: "90%",
                      textAlign: "justify",
                      paddingLeft: "20px",
                    }}
                  >
                    {service.service_description}
                  </small>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() =>
                        navigate(`/admin/services/update/${service.service_id}`)
                      }
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      <FaRegEdit />
                    </button>
                    <Link to={`/admin/services/${service.service_id}`}>
                      <MdDelete />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : !searchError && <div>No services available at the moment.</div> // Default message if there are no services at all
      }
    </>
  );
}

export default ServiceList;
