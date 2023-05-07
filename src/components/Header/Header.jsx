import React, { useState } from "react";
import "./Header.css";
import logoImg from "../../assets/iconCart2.png";
import { Link } from "react-router-dom";
import { menuNavigation } from "../../utils/listCategories";

import { Dropdown, Accordion } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";

const Header = () => {
  const { quantity } = useCartContext();
  const [openNav, setOpenNav] = useState(false);

  const clickOpen = () => {
    if (openNav === true) {
      setOpenNav(false);
    } else {
      setOpenNav(true);
    }
  };

  return (
    <header className={`${openNav ? "openHeader" : ""}`}>
      <section className="navContainer">
        <div
          className={`${openNav ? "burger burgerOpen" : "burger"}`}
          onClick={clickOpen}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="logo">
          <Link to="/">
            <span style={{ color: "#3fa779" }}>Shop</span>
            <span style={{ color: "#f33f71" }}>Melon</span>
          </Link>
        </div>
        <div className="menuNavigation">
          <Link to={"/"}>Inicio</Link>
          <Dropdown>
            <Dropdown.Toggle
              style={{
                backgroundColor: "transparent",
                border: "none",
                padding: "0",
              }}
              id="dropdown"
              variant="secondary"
            >
              Categorias
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {menuNavigation.map((i) => (
                <Dropdown.Item
                  key={i[1]}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "0",
                  }}
                >
                  <Link style={{ width: "100%", padding: "5px 0px" }} to={i[1]}>
                    {i[0]}
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Link to={"/contacto"}>Contacto</Link>
        </div>
        <div className="miniCartContainer">
          <Link to={"/carrito"}>
            <div className="miniCart">
              <img src={logoImg} alt="icon cart" />
              {quantity !== 0 && quantity < 10 && (
                <p className="numbersCart oneNumber">{quantity}</p>
              )}
              {quantity !== 0 && quantity >= 10 && (
                <p className="numbersCart">{quantity}</p>
              )}
            </div>
          </Link>
        </div>
      </section>
      {/* Menu desplegable responsive */}
      <section className={`${openNav ? "menuBurgerOpen" : "menuBurger"}`}>
        <Link onClick={clickOpen} to={"/"}>
          Inicio
        </Link>
        <Accordion defaultActiveKey="0">
          <Accordion.Item
            eventKey="1"
            style={{
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <Accordion.Header>Categorias</Accordion.Header>
            <Accordion.Body
              style={{ display: "flex", flexDirection: "column" }}
            >
              {menuNavigation.map((i) => (
                <Link
                  key={i[1]}
                  onClick={clickOpen}
                  style={{ width: "100%" }}
                  to={i[1]}
                >
                  {i[0]}
                </Link>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Link onClick={clickOpen} to={"/contacto"}>
          Contacto
        </Link>
      </section>
    </header>
  );
};

export default Header;
