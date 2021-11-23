const { transactionFind } = require('../../services/index');
const { getTotalAmountByMonth } = require('../../services/index');
const { SUCCESS } = require('../../helpers/index');

const getTransactions = async (req, res) => {
  const { _id, balance } = req.user;
  const { transactionType } = req.params;


  const transactionsById = await transactionFind({ owner: _id, transactionType });

  const totalAmountByMonth = await getTotalAmountByMonth(transactionsById);
  
  res.status(SUCCESS).json({
    status: 'success',
    code: SUCCESS,
    balance,
    totalAmountByMonth,
    data: transactionsById,
  });
};

module.exports = getTransactions;
