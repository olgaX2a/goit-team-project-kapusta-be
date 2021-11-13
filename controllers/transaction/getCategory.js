const { transactionFind } = require('../../services/index');

const getCategory = async (req, res) => {
  const { transactionType } = req.params;
  const { month, year } = req.body;
  const { _id, balance } = req.user;

  const transactionsById = await transactionFind({ owner: _id });
  const result = transactionsById
    .filter(transaction => transaction.year === year)
    .filter(transaction => transaction.month === month);
  console.log(result);

  res.status(201).json({
    status: 'success',
    code: 201,
    balance,
    data: {
      month,
      year,
      balance,
    },
  });
};

module.exports = getCategory;
