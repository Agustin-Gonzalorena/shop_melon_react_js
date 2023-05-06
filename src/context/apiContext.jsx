import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiMercadoLibre } from "../utils/apiMercadoLibre";

const apiContext = createContext();
export const useApiContext = () => useContext(apiContext);

const ApiContextProvider = ({ children }) => {
  const [products, setProducts] = useState({ loading: true, data: [] });
  const navigate = useNavigate();

  const getProducts = async (category) => {
    setProducts({ ...products, loading: true });
    try {
      const response = await apiMercadoLibre.get(
        `sites/MLA/search?category=${category}`
      );
      const {
        data: { results },
      } = response;

      if (results.length === 0) navigate("*");

      setProducts({ loading: false, data: results });
    } catch (error) {
      navigate("*");
      console.log(error);
    }
  };
  return (
    <apiContext.Provider value={{ products, getProducts }}>
      {children}
    </apiContext.Provider>
  );
};

export default ApiContextProvider;
