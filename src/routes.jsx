import {
  Cart,
  Contact,
  Home,
  NotFound,
  ProductDetail,
  Products,
} from "./components/pages/index";
const routes = [
  { path: "/", component: <Home /> },
  { path: "/productos/:category", component: <Products /> },
  { path: "/producto/:ID", component: <ProductDetail /> },
  { path: "/contacto", component: <Contact /> },
  { path: "/carrito", component: <Cart /> },
  { path: "*", component: <NotFound /> },
];

export default routes;
