const { transactionFind } = require('../../services/index');
const { CREATED } = require('../../helpers/index');

const getAllByCategory = async (req, res) => {
  const { category } = req.query;
  const { _id } = req.user;
  const allTransactionsByUser = await transactionFind({ owner: _id });
  const data = allTransactionsByUser.filter(transaction => transaction.category === category);

  res.status(CREATED).json({
    status: 'success',
    code: CREATED,
    category,
    data,
  });
};

module.exports = getAllByCategory;
