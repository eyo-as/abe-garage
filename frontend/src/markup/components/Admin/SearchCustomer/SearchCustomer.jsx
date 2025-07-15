import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchCustomer = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        className="w-100 p-2 border border-5 border-secondary rounded text-dark"
        placeholder="Search for a customer by first name, last name, Email, or Phone"
        value={searchTerm}
        onChange={handleChange}
      />
      <SearchIcon
        size={30}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
      />
    </>
  );
};

export default SearchCustomer;
