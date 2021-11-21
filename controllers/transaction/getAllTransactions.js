const { transactionFind } = require('../../services/');
const { SUCCESS } = require('../../helpers/index');

const getAllTransactions = async (req, res) => {
  const { _id, balance } = req.user;

  const getAllTransactionsByUser = await transactionFind({ owner: _id });

  res.status(SUCCESS).json({
    status: 'success',
    code: SUCCESS,
    balance,
    data: {
      data: getAllTransactionsByUser,
    },
  });
};

module.exports = getAllTransactions;
