import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section
      style={{
        height: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "100px" }}>Opps!</h1>
        <h2 style={{ fontWeight: "900" }}>404</h2>
        <h2>Pagina no encontrada</h2>
        <Button variant="dark">
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            Volver
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
