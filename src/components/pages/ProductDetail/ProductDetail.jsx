import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useCartContext } from "../../../context/CartContext";
import { apiMercadoLibre } from "../../../utils/apiMercadoLibre";

const ProductDetail = () => {
  const { addToCart, cartProducts } = useCartContext();
  const { ID } = useParams();
  const navegar = useNavigate();
  const [product, setProduct] = useState({});
  const [stock, setStock] = useState(0);
  const [posImg, setPosImg] = useState(0);

  const getOneProduct = async () => {
    try {
      const response = await apiMercadoLibre.get(`items/${ID}`);
      const { data } = response;
      setStock(data.available_quantity);
      setProduct(data);
      checkStock(data.available_quantity);
    } catch (error) {
      console.log(error);
      navegar("*");
    }
  };
  const checkStock = (stockReal) => {
    let cart = [...cartProducts];
    cart.find((p) => {
      if (p.id === ID) {
        setStock(stockReal - p.cant);
      }
    });
  };

  const nextImg = () => {
    if (posImg === product.pictures.length - 1) {
      setPosImg(0);
    } else {
      setPosImg(posImg + 1);
    }
  };
  const prevImg = () => {
    if (posImg === 0) {
      setPosImg(product.pictures.length - 1);
    } else {
      setPosImg(posImg - 1);
    }
  };
  const selectImg = (number) => {
    setPosImg(number);
  };

  useEffect(() => {
    getOneProduct();
  }, []);

  return (
    <section className="productDetail">
      <div className="productCardContainer">
        <div className="boxInfoResponsive">
          <p>
            <span>{product.condition === "new" ? "Nuevo" : "Usado"}</span> |
            {product.sold_quantity} vendidos
          </p>
          <h1>{product.title}</h1>
        </div>
        <div className="centerBoxImg">
          <div className="boxImgProductCard">
            {Object.entries(product).length !== 0 && (
              <button className="changueImg" onClick={prevImg}>
                ❮
              </button>
            )}

            {Object.entries(product).length !== 0 && (
              <img src={product.pictures[posImg].url} />
            )}
            {Object.entries(product).length !== 0 && (
              <button className="changueImg" onClick={nextImg}>
                ❯
              </button>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {Object.entries(product).length !== 0 &&
              product.pictures.map((i) =>
                product.pictures.indexOf(i) === posImg ? (
                  <button
                    key={i.url}
                    style={{
                      backgroundColor: "grey",
                      borderRadius: "50%",
                      border: "0.5px solid grey",
                      height: "15px",
                      width: "1px",
                      fontSize: "0.5px",
                    }}
                  ></button>
                ) : (
                  <button
                    key={i.url}
                    style={{
                      borderRadius: "50%",
                      border: "0.5px solid grey",
                      height: "15px",
                      fontSize: "10px",
                    }}
                    onClick={() => selectImg(product.pictures.indexOf(i))}
                  >
                    {" "}
                  </button>
                )
              )}
          </div>
        </div>
        <h2 className="priceResponsive">
          ${new Intl.NumberFormat().format(product.price)}
        </h2>
        <div className="boxInfoProduct">
          <p>
            <span>{product.condition === "new" ? "Nuevo" : "Usado"}</span> |
            {product.sold_quantity} vendidos
          </p>
          <h1>{product.title}</h1>
          <h2>${new Intl.NumberFormat().format(product.price)}</h2>
        </div>
        <div className="boxButtonProductCard">
          {Object.entries(product).length !== 0 &&
          product.shipping.free_shipping ? (
            <p className="shippingProduct"> Envío gratis a todo el pais</p>
          ) : (
            <p></p>
          )}
          <div>
            {stock !== 0 ? (
              <p>Stock disponible</p>
            ) : (
              <p style={{ color: "red" }}>Stock agotado</p>
            )}
            <p>Cantidad: {stock}</p>
            {stock > 0 ? (
              <Button
                variant="dark"
                onClick={() => {
                  addToCart(
                    product.id,
                    product.title,
                    product.price,
                    product.thumbnail
                  );
                  setStock(stock - 1);
                }}
              >
                Agregar al carrito
              </Button>
            ) : (
              <Button variant="dark" disabled>
                Agregar al carrito
              </Button>
            )}
            <p>{product.warranty}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
