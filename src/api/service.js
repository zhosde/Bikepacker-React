import axios from "axios";

const service = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const errorHandler = (err) => {
  throw err;
};

const handleUpload = (file) => {
  return service
    .post("/upload", file)
    .then((res) => res.data)
    .catch(errorHandler);
};

const saveNewProduct = (newProduct) => {
  return service
    .post("/products", newProduct)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default {
  service,
  handleUpload,
  saveNewProduct,
};
