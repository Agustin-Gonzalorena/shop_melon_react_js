import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  const addToCart = (id, name, price, img) => {
    let products = [...cartProducts];
    let newProduct = true;

    if (products.length == 0) {
      products.push({ id, name, price, img, cant: 1 });
      setCartProducts(products);
      setQuantity(quantity + 1);
      setTotal(price);
    } else {
      products.forEach((p) => {
        if (p.name == name) {
          p.cant++;
          setQuantity(quantity + 1);
          setCartProducts(products);
          setTotal(total + p.price);
          newProduct = false;
        }
      });

      if (newProduct) {
        products.push({ id: id, name: name, price: price, img: img, cant: 1 });
        setCartProducts(products);
        setQuantity(quantity + 1);
        setTotal(total + price);
      }
    }
  };
  const deleteOne = (id) => {
    let products = [...cartProducts];
    products.forEach((p) => {
      if (p.id === id) {
        setQuantity(quantity - p.cant);
        setTotal(total - p.price * p.cant);
      }
    });
    products = products.filter((p) => p.id !== id);

    setCartProducts(products);
  };
  const emptyCart = () => {
    setCartProducts([]);
    setQuantity(0);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{ addToCart, cartProducts, quantity, deleteOne, total, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
