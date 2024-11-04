import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const login = async (username, password) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });
  localStorage.setItem("token", response.data.token);
  return response;
};

export const getBalance = async () => {
  const response = await api.get("/transaction/balance", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const deposit = async (amount) => {
  const response = await api.post(
    "/transaction/deposit",
    { amount, username: "self" },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response;
};

export const withdraw = async (amount) => {
  const response = await api.post(
    "/transaction/withdraw",
    { amount, username: "self" },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response;
};

export const transfer = async (amount, recipientUsername) => {
  const response = await api.post(
    "/transaction/transfer",
    { amount, username: recipientUsername },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};

export const getTransactionHistory = async () => {
  const response = await api.get("/transaction/history", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token"); // Remove token from local storage
  window.location.href = "/login"; // Redirect to the login page
};
