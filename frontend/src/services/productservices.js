import axios from "axios";

const API_URL = "http://localhost:3000";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const createProduct = async (product, token) => {
  const response = await axios.post(`${API_URL}/products`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
