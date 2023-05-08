import React, { useEffect, useState } from "react";
import { useCartContext } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Checkout.css";
import Swal from "sweetalert2";

const Checkout = () => {
  const { quantity, emptyCart, total } = useCartContext();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");

  const clickForm = (e) => {
    e.preventDefault();
    if (email !== email2) {
      Swal.fire({
        title: "Error!",
        text: "Los mails no coinciden.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      checkBuy();
    }
  };
  const checkBuy = async () => {
    const { value: accept } = await Swal.fire({
      title: "Confirmar compra",
      text: `Productos: ${quantity} / Precio Total: $${new Intl.NumberFormat().format(
        total
      )}`,
      input: "checkbox",
      inputValue: 1,
      inputPlaceholder: "Confirmo esta compra",
      confirmButtonText: 'Continuar <i class="fa fa-arrow-right"></i>',
      inputValidator: (result) => {
        return !result && `No confirmo la compra.`;
      },
    });

    if (accept) {
      Swal.fire(`Gracias por la compra ${name}`);
      emptyCart();
      navigate("/");
    }
  };
  useEffect(() => {
    if (quantity === 0) {
      navigate("/");
    }
  }, []);
  return (
    <section className="pageCheckout">
      <div className="formContainer" onSubmit={clickForm}>
        <h1>Datos para enviar su compra:</h1>
        <form className="form">
          <input
            required
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            required
            type="mail"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="mail"
            placeholder="Repetir email"
            value={email2}
            onChange={(e) => setEmail2(e.target.value)}
          />

          <Button variant="dark" type="submit">
            Enviar
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
