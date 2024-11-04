"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getBalance,
  getTransactionHistory,
  deposit,
  withdraw,
  transfer,
  logout,
} from "../services/api";
import TransactionForm from "./TransactionForm";
import TransferForm from "./TransferForm";
import TransactionTable from "./TransactionTable";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState("Transfer");
  const [message, setMessage] = useState("");
  const [formType, setFormType] = useState(null);
  const [recipientUsername, setRecipientUsername] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  useEffect(() => {
    // Check for existing token in localStorage
    const token = localStorage.getItem("token");
    // check token expiration
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const tokenExpiration = tokenPayload.exp * 1000; // Convert to milliseconds
      const currentTime = new Date().getTime();
      setUsername(tokenPayload.sub);

      if (currentTime > tokenExpiration) {
        localStorage.removeItem("token");
        router.replace("/login"); // Redirect to login if token is expired
      } else {
        const fetchInitialData = async () => {
          const [balanceData, history] = await Promise.all([
            getBalance(),
            getTransactionHistory(),
          ]);
          setBalance(balanceData);
          setTransactions(history);
        };
        fetchInitialData();
      }
    }
  }, []);

  const updateBalanceAndTransactions = useCallback(async () => {
    const newBalance = await getBalance();
    const newTransactions = await getTransactionHistory();
    setBalance(newBalance);
    setTransactions(newTransactions);
  }, []);

  const handleDeposit = async () => {
    if (amount) {
      const response = await deposit(parseFloat(amount));
      if (response) {
        setMessage("Deposit successful.");
        updateBalanceAndTransactions();
      } else {
        setMessage("Deposit failed. Please try again.");
      }
      setAmount("");
    }
  };

  const handleWithdraw = async () => {
    if (amount) {
      const response = await withdraw(parseFloat(amount));
      if (response) {
        setMessage("Withdrawal successful.");
        updateBalanceAndTransactions();
      } else {
        setMessage("Insufficient funds or other error.");
      }
      setAmount("");
    }
  };

  const handleTransfer = async () => {
    if (amount && recipientUsername) {
      const response = await transfer(parseFloat(amount), recipientUsername);
      if (response) {
        setMessage("Transfer successful.");
        updateBalanceAndTransactions();
      } else {
        setMessage("Transfer failed. Please try again.");
      }
      setAmount("");
      setRecipientUsername("");
    }
  };
  const handleLogout = () => {
    logout();
  };

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) =>
        activeTab === "Transfer" ? transaction.toUser : transaction.fromUser
      ),
    [transactions, activeTab]
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div className=" flex">
          <h2 className="text-2xl/7 font-bold text-gray-900 truncate text-3xltracking-tight">
            Welcome {username}
          </h2>
        </div>
        <div className="flex">
          <button
            onClick={handleLogout}
            type="button"
            className="py-2 px-4 bg-red-600 text-white rounded mr-2 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
      {/* <h1 className="text-3xl font-bold mb-4">Dashboard</h1> */}
      <h2 className="text-2xl mb-6">Balance: ฿{balance}</h2>
      <div className="mb-6">
        {/* Deposit Btn */}
        <button
          onClick={() => {
            setFormType("deposit");
            setMessage("");
          }}
          className="py-2 px-4 bg-green-600 text-white rounded mr-2 hover:bg-green-700"
        >
          Deposit
        </button>
        {/* Withdraw Btn */}
        <button
          onClick={() => {
            setFormType("withdraw");
            setMessage("");
          }}
          className="py-2 px-4 bg-red-600 text-white rounded mr-2 hover:bg-red-700"
        >
          Withdraw
        </button>
        {/* Transfer Btn */}
        <button
          onClick={() => {
            setFormType("transfer");
            setMessage("");
          }}
          className="py-2 px-4 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
        >
          Transfer Money
        </button>
        {/* Deposit Form */}
        {formType === "deposit" && (
          <TransactionForm
            amount={amount}
            setAmount={setAmount}
            onSubmit={handleDeposit}
            buttonLabel="Confirm Deposit"
            message={message}
          />
        )}
        {/* ------------ */}
        {/* Withdraw Form */}
        {formType === "withdraw" && (
          <TransactionForm
            amount={amount}
            setAmount={setAmount}
            onSubmit={handleWithdraw}
            buttonLabel="Confirm Withdraw"
            message={message}
          />
        )}
        {/* ------------- */}
        {/* Transfer Form */}
        {formType === "transfer" && (
          <TransferForm
            amount={amount}
            setAmount={setAmount}
            recipientUsername={recipientUsername}
            setRecipientUsername={setRecipientUsername}
            onSubmit={handleTransfer}
            message={message}
          />
        )}
        {/* ---------------- */}
      </div>
      {/* Transfer Receive Menu Btns */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("Transfer")}
          className={`py-2 px-4 rounded ${
            activeTab === "Transfer" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Transfer Menu
        </button>
        {/* ----------------- */}
        <button
          onClick={() => setActiveTab("Receive")}
          className={`py-2 px-4 rounded ${
            activeTab === "Receive" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Receive Menu
        </button>
      </div>
      {/* ------------------------------------------- */}
      {/* Transaction Table */}
      <TransactionTable
        transactions={filteredTransactions}
        activeTab={activeTab}
      />
    </div>
  );
};

export default Dashboard;
