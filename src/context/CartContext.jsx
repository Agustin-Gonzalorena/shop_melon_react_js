import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const addToCart = (id, name, price, img) => {
    let products = [...cartProducts];
    let newProduct = true;

    if (products.length == 0) {
      products.push({ id, name, price, img, cant: 1 });
      setCartProducts(products);
      setQuantity(quantity + 1);
    } else {
      products.forEach((p) => {
        if (p.name == name) {
          p.cant++;
          setQuantity(quantity + 1);
          setCartProducts(products);
          newProduct = false;
        }
      });

      if (newProduct) {
        products.push({ id: id, name: name, price: price, img: img, cant: 1 });
        setCartProducts(products);
        setQuantity(quantity + 1);
      }
    }
  };
  const deleteOne = (id) => {
    let products = [...cartProducts];
    products.forEach((p) => {
      if (p.id === id) {
        setQuantity(quantity - p.cant);
      }
    });
    products = products.filter((p) => p.id !== id);

    setCartProducts(products);
  };
  return (
    <CartContext.Provider
      value={{ addToCart, cartProducts, quantity, deleteOne }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
