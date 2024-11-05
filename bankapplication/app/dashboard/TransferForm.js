const TransferForm = ({
  amount,
  setAmount,
  recipientUsername,
  setRecipientUsername,
  onSubmit,
  message,
  error,
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
    <input
      type="text"
      value={recipientUsername}
      onChange={(e) => setRecipientUsername(e.target.value)}
      placeholder="Recipient Username"
      className="p-2 border border-gray-300 rounded w-full mb-4"
    />
    <button
      onClick={onSubmit}
      className="py-2 px-4 bg-blue-600 text-white rounded w-full hover:bg-blue-700"
    >
      Confirm Transfer
    </button>
    {message && (
      <p className={`mb-6 ${error ? "text-red-600" : "text-green-600"}`}>
        {message}
      </p>
    )}
  </div>
);

export default TransferForm;
