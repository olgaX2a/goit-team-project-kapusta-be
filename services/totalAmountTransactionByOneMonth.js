const totalAmountTransactionByOneMonth = result => {
  const totalAmount = (acc, number) => {
    return acc + number;
  };

  let totalIncome = [];
  let totalExpense = [];

  result.map(transaction => {
    transaction.transactionType === 'income'
      ? totalIncome.push(transaction.amount)
      : totalExpense.push(transaction.amount);
    return;
  });

  return {
    totalIncome: totalIncome.reduce(totalAmount, 0),
    totalExpense: totalExpense.reduce(totalAmount, 0),
  };
};

module.exports = totalAmountTransactionByOneMonth;
