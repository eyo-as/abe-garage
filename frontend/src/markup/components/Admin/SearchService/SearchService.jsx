import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchService = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Trigger search on every input change (while typing)
  };

  const handleSearchClick = () => {
    onSearch(searchTerm); // Trigger search when the icon is clicked
  };

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <input
        type="text"
        className="w-100 p-2 border border-5 border-secondary rounded text-dark"
        placeholder="Search for a service by ID, name, or description"
        value={searchTerm}
        onChange={handleChange}
        style={{
          paddingRight: "40px", // Add space for the icon inside the input
        }}
      />
      <SearchIcon
        size={30}
        style={{
          position: "absolute",
          right: "10px",
          cursor: "pointer",
        }}
        onClick={handleSearchClick} // Trigger search on click
      />
    </div>
  );
};

export default SearchService;
