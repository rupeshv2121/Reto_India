import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
    const response = await api.post("/auth/signup", userData, { withCredentials: true });
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
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    console.error(
      "Error during signup:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createOrder = async (orderData) => {
  const response = await fetch("http://localhost:5000/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return await response.json();
};

// export default api;
