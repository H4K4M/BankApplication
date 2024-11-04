const TransactionForm = ({
  amount,
  setAmount,
  onSubmit,
  buttonLabel,
  message,
}) => (
  <div className=" p-4 bg-gray-100 rounded shadow-lg max-w-md mx-auto mt-10">
    <input
      type="number"
      value={amount}
      onChange={(e) => {
        const value = parseFloat(e.target.value);
        if (value > 0 || e.target.value === "") {
          setAmount(e.target.value);
        }
      }}
      placeholder="Enter amount"
      className="p-2 border border-gray-300 rounded w-full mb-4"
    />
    <button
      onClick={onSubmit}
      className="py-2 px-4 bg-blue-600 text-white rounded w-full hover:bg-blue-700"
    >
      {buttonLabel}
    </button>
    {message && <p className="mb-6 text-blue-600">{message}</p>}
  </div>
);

export default TransactionForm;
