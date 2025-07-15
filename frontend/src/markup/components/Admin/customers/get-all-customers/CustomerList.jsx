import React, { useEffect, useState } from "react";
import customerService from "../../../../../services/customer.service";
import { useAuth } from "../../../../../Context/AuthContext";
import { FaRegEdit } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import SearchCustomer from "../../SearchCustomer/SearchCustomer";
import { FaExternalLinkAlt } from "react-icons/fa";
const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const navigate = useNavigate();
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const customersData = await customerService.getAllCustomers(token);
        const data = await customersData.json();
        setCustomers(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadCustomers();
  }, [token]);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditButtonClick = (customerId) => {
    navigate(`/admin/customer/${customerId}`);
  };
  const filteredCustomers = customers.filter((customer) => {
    const searchTerm = searchQuery.toLowerCase();

    return (
      customer.customer_first_name.toLowerCase().includes(searchTerm) ||
      customer.customer_last_name.toLowerCase().includes(searchTerm) ||
      customer.customer_email.toLowerCase().includes(searchTerm) ||
      customer.customer_phone_number.toLowerCase().includes(searchTerm)
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredCustomers.length
  );
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <section className="contact-section">
      <div className="my-3">
        <div className="contact-title contact-customer mb-4">
          <h2>Customers</h2>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="position-relative" style={{ width: "80%" }}>
            <SearchCustomer onSearch={handleSearch} />
          </div>
        </div>
        <div>
          {customers?.length > 0 ? (
            <div className="table-responsive text-center">
              <table
                style={{
                  width: "80%",
                  margin: "0 auto",
                  whiteSpace: "nowrap",
                }}
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Active</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((customer) => (
                    <tr key={customer.customer_id}>
                      <td>{customer.customer_id}</td>
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
                      <td>
                        {new Date(customer.customer_added_date)
                          .toLocaleString("en-US", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                            timeZoneName: "short",
                          })
                          .replace(",", "")
                          .replace(" ", " | ")
                          .replace("AM", "")
                          .replace("PM", "")
                          .replace(" GMT+3", "")}
                      </td>
                      <td className="text-center">
                        {customer.active_customer_status ? "Yes" : "No"}
                      </td>
                      <td className="text-center">
                        <span
                          className="d-flex justify-content-center align-items-center"
                          style={{ gap: "10px" }}
                        >
                          <FaRegEdit
                            size={20}
                            onClick={() =>
                              handleEditButtonClick(customer.customer_id)
                            }
                          />
                          <Link to={`/admin/customer/profile/${customer.customer_id}`} style={{ textDecoration: "none" }}><FaExternalLinkAlt size={18} /></Link>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination controls */}
              <div>
                <nav
                  aria-label="Page navigation example"
                  className="d-flex justify-content-center align-items-center my-5 w-100"
                >
                  <ul className="pagination">
                    {/* First Page Button */}
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(1)}
                      >
                        First
                      </button>
                    </li>

                    {/* Previous Page Button */}
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Previous
                      </button>
                    </li>

                    {/* Loop to generate page number buttons */}
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i + 1}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}

                    {/* Next Page Button */}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Next
                      </button>
                    </li>

                    {/* Last Page Button */}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        Last
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          ) : (
            <div>No customer data available.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomersList;
