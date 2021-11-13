const { transactionFind, totalAmountTransactionByOneMonth } = require('../../services/index');

const getCategory = async (req, res) => {
  const { transactionType } = req.params;
  const { month, year } = req.body;
  const { _id, balance } = req.user;

  const allTransactionsByUser = await transactionFind({ owner: _id });
  const allTransactionsByMonth = allTransactionsByUser
    .filter(transaction => transaction.year === year)
    .filter(transaction => transaction.month === month);

  const totalAmountTransactionsByReportMonth =
    totalAmountTransactionByOneMonth(allTransactionsByMonth);

  const allTransactionsByTypeForMonth = allTransactionsByMonth.filter(
    transaction => transaction.transactionType === transactionType,
  );

  res.status(201).json({
    status: 'success',
    code: 201,
    month,
    year,
    balance,
    totalAmountTransactionsByReportMonth,
    allTransactionsByTypeForMonth,
    allTransactionsByUser,
  });
};

module.exports = getCategory;
