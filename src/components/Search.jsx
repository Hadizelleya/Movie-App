import React from "react";

export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="search">
      <div>
        <img src="../../public/search.svg" alt="search-icon" />
        <input
          type="text"
          placeholder="Search Through Thousands of Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
