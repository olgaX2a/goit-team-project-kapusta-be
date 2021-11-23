const { transactionFind, totalAmountTransactionByOneMonth } = require('../../services/index');
const { CREATED } = require('../../helpers/index');

const getCategory = async (req, res) => {
  const { month, year, transactionType } = req.query;
  const { _id, balance } = req.user;

  const allTransactionsByUser = await transactionFind({ owner: _id });
  const allTransactionsByMonth = allTransactionsByUser
    .filter(transaction => transaction.year === Number(year))
    .filter(transaction => transaction.month === Number(month));

  const totalAmountTransactionsByReportMonth =
    totalAmountTransactionByOneMonth(allTransactionsByMonth);

  const allTransactionsByTypeForMonth = allTransactionsByMonth.filter(
    transaction => transaction.transactionType === transactionType,
  );

  res.status(CREATED).json({
    status: 'success',
    code: CREATED,
    month,
    year,
    balance,
    totalAmountTransactionsByReportMonth,
    allTransactionsByTypeForMonth,
    allTransactionsByUser,
  });
};

module.exports = getCategory;
