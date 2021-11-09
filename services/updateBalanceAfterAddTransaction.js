const updateBalanceAfterAddTransaction = (
  oldBalance,
  amount,
  transactionType
) => {
  const newBalance =
    transactionType === "income" ? oldBalance + amount : oldBalance - amount;
  return newBalance;
};

module.exports = updateBalanceAfterAddTransaction;
