const { transactionFind } = require('../../services/index');
const { getTotalAmountByMonth } = require('../../services/index');

const getTransactions = async (req, res) => {
  const { _id, balance } = req.user;
  const { transactionType } = req.params;

  const transactionsById = await transactionFind({ owner: _id, transactionType });

  const totalAmountByMonth = await getTotalAmountByMonth(transactionsById);
  res.status(201).json({
    status: 'success',
    code: 201,
    balance,
    totalAmountByMonth,
    data: transactionsById,
  });
};

module.exports = getTransactions;
