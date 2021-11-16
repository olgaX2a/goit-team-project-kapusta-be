const { transactionFind } = require('../../services/index');

const getAllByCategory = async (req, res) => {
  const { category } = req.query;
  const { _id } = req.user;
  const allTransactionsByUser = await transactionFind({ owner: _id });
  const data = allTransactionsByUser.filter(transaction => transaction.category === category);

  res.status(201).json({
    status: 'success',
    code: 201,
    category,
    data,
  });
};

module.exports = getAllByCategory;
