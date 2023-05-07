import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useCartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
const Cart = () => {
  const { cartProducts, deleteOne } = useCartContext();

  return (
    <div className="cartPageContainer">
      <h1>Carrito:</h1>
      {cartProducts.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="centerCart" style={{ borderRadius: "30px" }}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Imag.</th>
                <th>Titulo</th>
                <th>precio</th>
                <th>Cant.</th>
                <th>X</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((p) => (
                <tr>
                  <td>
                    <Link to={`/producto/${p.id}`}>
                      <img src={p.img} alt="" />
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/producto/${p.id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <p>{p.name}</p>
                    </Link>
                  </td>
                  <td>
                    Unid: ${new Intl.NumberFormat().format(p.price)} / total: $
                    {new Intl.NumberFormat().format(p.price * p.cant)}
                  </td>
                  <td>{p.cant}</td>
                  <td>
                    <Button onClick={() => deleteOne(p.id)} variant="danger">
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>Hola</div>
        </div>
      )}
    </div>
  );
};

export default Cart;
