import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Login function
export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", response.data.token); // Store the token
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Get balance function
export const getBalance = async () => {
  try {
    const response = await api.get("/transaction/balance", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Deposit function
export const deposit = async (amount) => {
  try {
    const response = await api.post(
      "/transaction/deposit",
      { amount, username: "self" },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Withdraw function
export const withdraw = async (amount) => {
  try {
    const response = await api.post(
      "/transaction/withdraw",
      { amount, username: "self" },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Transfer function
export const transfer = async (amount, recipientUsername) => {
  try {
    const response = await api.post(
      "/transaction/transfer",
      { amount, username: recipientUsername },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Get transaction history function
export const getTransactionHistory = async () => {
  try {
    const response = await api.get("/transaction/history", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// Helper function handle errors
const handleError = (error) => {
  if (error.response) {
    return {
      // respones error
      success: false,
      message: error.response.data || "An error occurred.",
    };
  } else if (error.request) {
    // no response received
    return { success: false, message: "No response from server." };
  } else {
    return { success: false, message: error.message };
  }
};
