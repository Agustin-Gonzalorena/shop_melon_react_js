import React, { useState, useEffect } from "react";
import "./Products.css";
import { useParams, useNavigate } from "react-router-dom";
import { useApiContext } from "../../../context/apiContext";
import { Spinner } from "react-bootstrap";
import Filterbar from "../../Filterbar/Filterbar";
import { categories } from "../../../utils/listCategories";
import CardProduct from "../../CardProduct/CardProduct";

const Products = () => {
  const { category } = useParams();
  const { navigate } = useNavigate();
  const { products, getProducts } = useApiContext();
  const [local, setLocal] = useState([]);
  const [backLocal, setBackLocal] = useState([]);
  const [search, setSearch] = useState("");

  //Funciones para ordenar los productos de distintas maneras
  const orderHigh = () => {
    const order = [...local].sort((a, b) => b.price - a.price);
    setLocal(order);
  };
  const orderLow = () => {
    const order = [...local].sort((a, b) => a.price - b.price);
    setLocal(order);
  };
  const orderDefault = () => {
    setLocal(backLocal);
  };
  const orderLastOne = () => {
    const order = [...local].sort(
      (a, b) => a.initial_quantity - b.initial_quantity
    );
    setLocal(order);
  };

  //Filtro para buscar podructos por titulo del producto
  const filtro =
    search !== ""
      ? [...local].filter((f) => f.title.toLowerCase().indexOf(search) >= 0)
      : local;

  useEffect(() => {
    (async () => {
      if (!categories[category]) {
        navigate("*");
      } else await getProducts(categories[category]);
    })();
  }, [category]);
  /* useEffect(() => {
    console.log("entro");
    if (!categories[category]) {
      navigate("*");
    } else getProducts(categories[category]);
  }, [category]); */
  useEffect(() => {
    setLocal(products.data);
    setBackLocal(products.data);
  }, [products]);

  return (
    <section className="productsContainer">
      <Filterbar
        orderHigh={orderHigh}
        orderLow={orderLow}
        orderDefault={orderDefault}
        orderLastOne={orderLastOne}
        setSearch={setSearch}
      />
      <div className="products">
        {products.loading ? (
          <div className="emptyContainer">
            <div>
              <Spinner animation="grow" />
              <Spinner animation="grow" />
              <Spinner animation="grow" />
            </div>
          </div>
        ) : (
          filtro.map((i) => <CardProduct key={i.id} id={i.id} product={i} />)
        )}
        {!search == "" && filtro && filtro.length == 0 && (
          <div className="emptyContainer">
            <h4 style={{ width: "20rem", textAlign: "center" }}>
              No se encontraron resultados para tu busqueda
            </h4>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
