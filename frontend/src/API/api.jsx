import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const checkout = async (userData) => {
  const response = await api.post("/checkout", userData);
  return response;
};
