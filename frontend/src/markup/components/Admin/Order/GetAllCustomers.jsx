import React, { useEffect, useState } from "react";
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Context/AuthContext";
import { FaHandPointer } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SearchCustomer from "../../../components/Admin/SearchCustomer/SearchCustomer"; // Assuming this is your search bar component

const GetAllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
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

  const handleEditButtonClick = (customerId) => {
    navigate(`/admin/customer/${customerId}`);
  };


  
  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      customer.customer_first_name.toLowerCase().includes(searchTerm) ||
      customer.customer_last_name.toLowerCase().includes(searchTerm) ||
      customer.customer_email.toLowerCase().includes(searchTerm) ||
      customer.customer_phone_number.toLowerCase().includes(searchTerm)
    );
  });

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="create-order-section">
      {/* Internal CSS */}
      <style>{`
        .create-order-section {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
        }
        h2 {
          font-size: 24px;
          color: #333;
          font-weight: bold;
        }
        .btn-danger {
          background-color: red;
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
        }
        .search-bar-wrapper {
          margin-bottom: 20px;
        }
        .table {
          width: 100%;
          margin-bottom: 20px;
          background-color: #fff;
          border: 1px solid #ddd;
        }
        .table th, .table td {
          padding: 12px;
          text-align: center;
          vertical-align: middle;
          border-top: 1px solid #ddd;
        }
        .table td {
          background-color: #f4f4f4;
        }
        .table-hover tbody tr:hover {
          background-color: #f1f1f1;
        }
        .d-flex {
          display: flex;
        }
        .justify-content-center {
          justify-content: center;
        }
        .align-items-center {
          align-items: center;
        }
        .my-4 {
          margin: 16px 0;
        }
        .hidden {
          display: none;
        }
      `}</style>

      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-primary">Create a new order</h2>
          <Link to="/admin/add-customer" className="btn btn-danger">
            Add New Customer
          </Link>
        </div>

        {/* Search bar */}
        <div className="search-bar-wrapper mb-4">
          <SearchCustomer onSearch={handleSearch} />
        </div>

        {/* Hide table until search query is entered */}
        {searchQuery && filteredCustomers.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover text-center">
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_first_name}</td>
                    <td>{customer.customer_last_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone_number}</td>
                    <td>
                      <span className="d-flex justify-content-center align-items-center">
                        <Link
                          to={`/admin/order/customer/${customer.customer_id}`}
                          style={{ textDecoration: "none", marginLeft: "10px" }}
                        >
                          <FaHandPointer size={18} />
                        </Link>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : searchQuery ? (
          <div>No customers match your search.</div>
        ) : null}
      </div>
    </section>
  );
};

export default GetAllCustomers;