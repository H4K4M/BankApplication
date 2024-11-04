const TransactionTable = ({ transactions, activeTab }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="py-3 px-4 border-b">Date-Time</th>
          <th className="py-3 px-4 border-b">User</th>
          <th className="py-3 px-4 border-b">Remaining Balance</th>
          <th className="py-3 px-4 border-b">Action</th>
          <th className="py-3 px-4 border-b">
            {activeTab === "Transfer" ? "To" : "From"}
          </th>
          <th className="py-3 px-4 border-b">Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.transactionId} className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b">
              {new Date(transaction.date).toLocaleDateString("th-TH")}-
              {new Date(transaction.date).toLocaleTimeString("th-TH")}
            </td>
            <td className="py-3 px-4 border-b">{transaction.user.username}</td>
            <td className="py-3 px-4 border-b">
              ฿{transaction.remainingBalance}
            </td>
            <td className="py-3 px-4 border-b">{transaction.actionType}</td>
            <td className="py-3 px-4 border-b">
              {activeTab === "Transfer"
                ? transaction.toUser
                : transaction.fromUser}
            </td>
            <td className="py-3 px-4 border-b">฿{transaction.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TransactionTable;
