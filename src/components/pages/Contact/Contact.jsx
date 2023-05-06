import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contactContainer">
      <div>
        <h1>
          <span style={{ color: "#3fa779" }}>Shop</span>
          <span style={{ color: "#f33f71" }}>Melon</span>
        </h1>
        <p>Practica E-commerce</p>
        <p>Aplicando conocimientos Curso React JS CoderHouse</p>
        <a
          href="https://www.linkedin.com/in/agustin-gonzalorena/"
          target="_blank"
        >
          <h2 className="myname">
            {">>>>>"}Agustin Gonzalorena{"<<<<<"}
          </h2>
        </a>
      </div>
    </section>
  );
};

export default Contact;
