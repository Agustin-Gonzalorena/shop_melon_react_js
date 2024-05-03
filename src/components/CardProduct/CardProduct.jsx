import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CardProduct.css";
import { Card, Spinner } from "react-bootstrap";
import { apiMercadoLibre } from "../../utils/apiMercadoLibre";
const CardProduct = ({ id, product }) => {
  const [image, setImage] = useState(null);

  const getItemImage = async () => {
    try {
      const response = await apiMercadoLibre.get(`items/${id}`);
      setImage(response.data.pictures[0].url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemImage();
  }, []);
  return (
    <section>
      {product && (
        <Card className="card">
          <Link
            to={`/producto/${product.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            {product.initial_quantity === 1 && (
              <p className="oportunity">
                <span>¡Última disponible!</span>
              </p>
            )}

            <div className="boxImg">
              {image ? <Card.Img variant="top" src={image} /> : <Spinner />}
            </div>
            <Card.Body className="bodyCard">
              <div className="boxInfo">
                <Card.Title className="titleCard">
                  {product.title.substring(0, 50)}...
                </Card.Title>
                <Card.Text>
                  {product.shipping.free_shipping ? (
                    <p className="shipping"> Envío gratis</p>
                  ) : (
                    <p></p>
                  )}
                  <h3 style={{ margin: "0", fontWeight: "400" }}>
                    ${new Intl.NumberFormat().format(product.price)}
                  </h3>
                </Card.Text>
              </div>
            </Card.Body>
          </Link>
        </Card>
      )}
    </section>
  );
};

export default CardProduct;
