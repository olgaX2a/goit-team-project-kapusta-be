const { Transaction } = require('../../model/index');
const { User } = require('../../model');
const { NotFound } = require('http-errors');

const deleteTransactions = async (req, res) => {
  const { _id, balance } = req.user;
  const { transactionId } = req.params;
  const transaction = await Transaction.findOneAndRemove({ _id: transactionId, owner: _id });

  const { amount, typeTransaction } = transaction;

  const updateAfterDelete = typeTransaction === 'income' ? balance - amount : balance + amount;
  await User.findByIdAndUpdate({ _id }, { balance: updateAfterDelete });

  if (!transaction) {
    throw new NotFound(`Transaction with id=${transactionId} is not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success remove',
    data: {
      transaction,
    },
  });
};

module.exports = deleteTransactions;
