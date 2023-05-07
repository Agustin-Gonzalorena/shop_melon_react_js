import React from "react";
import "./CardCategory.css";
import { Link } from "react-router-dom";
const CardCategory = ({ name, endpoint }) => {
  let leftover = name.substring(1);
  return (
    <Link to={endpoint} className="linkCardCategory">
      <div className="cardCategory">
        <h2>
          <span>{name[0]}</span>
          {leftover}
        </h2>
      </div>
    </Link>
  );
};

export default CardCategory;
