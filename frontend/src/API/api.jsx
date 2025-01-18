import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// For Checkout Page
export const checkout = async (userData) => {
  try {
    const response = await api.post("/checkout", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Error during checkout:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// For Signup Page
export const signUpUser = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    console.log("Signup successful:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error during signup:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default api;