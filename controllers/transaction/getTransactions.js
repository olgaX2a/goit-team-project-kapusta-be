const { transactionFind } = require('../../services/index');

const getTransactions = async (req, res) => {
  const { _id, balance } = req.user;
  const { transactionType } = req.params;

  const transactionsById = await transactionFind({ owner: _id });
  const result = transactionsById.filter(
    transaction => transaction.transactionType === transactionType,
  );
  res.status(201).json({
    status: 'success',
    code: 201,
    balance,
    data: result,
  });
};

module.exports = getTransactions;
