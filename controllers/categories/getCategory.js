const { transactionFind, totalAmountTransactionByOneMonth } = require('../../services/index');

const getCategory = async (req, res) => {
  const { month, year, transactionType } = req.params;
  const { _id, balance } = req.user;

  const allTransactionsByUser = await transactionFind({ owner: _id });
  const allTransactionsByMonth = allTransactionsByUser
    .filter(transaction => transaction.year === Number(year))
    .filter(transaction => transaction.month === Number(month));

  console.log(allTransactionsByUser);

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
