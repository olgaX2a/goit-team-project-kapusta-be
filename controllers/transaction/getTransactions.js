const { transactionFind } = require('../../services/index');
const { getTotalAmountByMonth } = require('../../services/index');

const getTransactions = async (req, res) => {
  const { _id, balance } = req.user;
  const { transactionType } = req.params;

  const transactionsById = await transactionFind({ owner: _id });
  const result = transactionsById.filter(
    transaction => transaction.transactionType === transactionType,
  );
  const totalAmountByMonth = getTotalAmountByMonth(result);
  res.status(201).json({
    status: 'success',
    code: 201,
    balance,
    totalAmountByMonth,
    data: result,
  });
};

module.exports = getTransactions;
