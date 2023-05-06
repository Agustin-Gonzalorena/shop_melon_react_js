import React from "react";
import "./InputSearch.css";

const InputSearch = ({ text, setSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={text}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
    </div>
  );
};

export default InputSearch;
