const { Transaction } = require('../../model/index');
const { User } = require('../../model');
const { NotFound } = require('http-errors');

const deleteTransaction = async (req, res) => {
  const { _id, balance } = req.user;
  const { transactionId } = req.params;
  const transaction = await Transaction.findOneAndRemove({ _id: transactionId, owner: _id });

  if (!transaction) {
    throw new NotFound(`Transaction with id=${transactionId} is not found`);
  }

  const { amount, typeTransaction } = transaction;

  const updateAfterDelete = typeTransaction === 'income' ? balance - amount : balance + amount;
  await User.findByIdAndUpdate({ _id }, { balance: updateAfterDelete });

  res.json({
    status: 'success',
    code: 200,
    message: 'Success remove',
    data: {
      transaction,
      balance: updateAfterDelete,
    },
  });
};

module.exports = deleteTransaction;
