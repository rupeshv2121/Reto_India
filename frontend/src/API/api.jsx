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
    console.log("Signup successful:");
    const response = await api.post("/auth/signup", userData);
    return response?.data;
  } catch (error) {
    console.error(
      "Error during signup:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//Login
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error during signup:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// export default api;
