import React from "react";
import "./Filterbar.css";
import { Dropdown } from "react-bootstrap";
import InputSearch from "../InputSearch/InputSearch";

const Filterbar = ({
  orderHigh,
  orderLow,
  orderDefault,
  orderLastOne,
  setSearch,
}) => {
  return (
    <section className="filterbarContainer">
      <div
        style={{
          width: "10rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputSearch text={"Buscar"} setSearch={setSearch} />
      </div>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-button-dark-example1"
          variant="dark"
          size="sm"
          style={{
            fontSize: "15px",
            padding: "0px 40px",
            borderRadius: "20px",
          }}
        >
          Filtrar
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item onClick={orderDefault}>Relevancia</Dropdown.Item>
          <Dropdown.Item onClick={orderHigh}>Mayor precio</Dropdown.Item>
          <Dropdown.Item onClick={orderLow}>Menor precio</Dropdown.Item>
          <Dropdown.Item onClick={orderLastOne}>Ultimas unidades</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </section>
  );
};

export default Filterbar;
