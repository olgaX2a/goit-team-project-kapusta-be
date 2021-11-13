const { transactionFind } = require('../../services/');

const getAllTransactions = async (req, res) => {
  const { _id, balance } = req.user;

  const getAllTransactionsByUser = await transactionFind({ owner: _id });

  res.status(201).json({
    status: 'success',
    code: 201,
    balance,
    data: {
      data: getAllTransactionsByUser,
    },
  });
};

module.exports = getAllTransactions;
