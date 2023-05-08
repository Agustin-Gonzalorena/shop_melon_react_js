import React from "react";
import "./InputSearch.css";

const InputSearch = ({ text, setSearch }) => {
  return (
    <div className="searchInput">
      <input
        type="text"
        placeholder={text}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
    </div>
  );
};

export default InputSearch;
