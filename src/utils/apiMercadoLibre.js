import axios from "axios";
//endpoint base
const apiMercadoLibre = axios.create({
  baseURL: "https://api.mercadolibre.com/",
});
export { apiMercadoLibre };
