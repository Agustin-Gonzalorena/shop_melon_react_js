import React, { useEffect, useState } from "react";
import "./Home.css";
import { useApiContext } from "../../../context/apiContext";
import { apiMercadoLibre } from "../../../utils/apiMercadoLibre";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import CardCategory from "../../CardCategory/CardCategory";
import { menuNavigation } from "../../../utils/listCategories";
import CardProduct from "../../CardProduct/CardProduct";

const Home = () => {
  const { products, getProducts } = useApiContext();
  const [loading, setLoading] = useState(true);
  const [oneProduct, setOneProduct] = useState([]);
  const [fourProducts, setFourProducts] = useState([]);

  const orderHigh = () => {
    const order = [...products.data].sort((a, b) => b.price - a.price);
    getItemImage(order[0]);
  };

  const getItemImage = async (p) => {
    try {
      const response = await apiMercadoLibre.get(`items/${p.id}`);
      setOneProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts("MLA1652");
    document.title = `ShopMelon`;
  }, []);
  useEffect(() => {
    orderHigh();
  }, [products]);
  useEffect(() => {
    if (products.data.length !== 0) {
      let nuevo = [];
      for (let i = 0; i < 4; i++) {
        nuevo.push(products.data[i]);
      }
      setFourProducts(nuevo);
    }
  }, [loading]);
  return (
    <>
      <section className="containerBanner">
        <Link className="linkBanner" to={`/producto/${oneProduct.id}`}>
          <div className="banner">
            <div className="titleBanner">
              <div className="slogan">
                <h1>Tu nuevo producto favorito</h1>
                <p>Te esta esperando.</p>
                <button className="buttonSlogan">Conoce mas</button>
              </div>
            </div>
            <div className="boxImgBanner">
              {loading ? <Spinner /> : <img src={oneProduct.pictures[0].url} />}
            </div>
          </div>
        </Link>
      </section>
      <section className="separatorContainer">
        <div className="separator">
          <h2>Categorias:</h2>
        </div>
      </section>
      <section className="showCategories">
        <div className="categoriesContainer">
          {menuNavigation.map((c) => (
            <CardCategory name={c[0]} endpoint={c[1]} />
          ))}
        </div>
      </section>
      <section className="separatorContainer">
        <div className="separator">
          <h2>Algunos de nuestros productos:</h2>
        </div>
      </section>
      <section className="showProductsHome">
        {fourProducts.map((e) => (
          <CardProduct id={e.id} product={e} />
        ))}
      </section>
    </>
  );
};

export default Home;
