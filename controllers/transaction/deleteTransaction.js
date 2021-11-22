const { Transaction } = require('../../model/index');
const { User } = require('../../model');
const { NotFound } = require('http-errors');
const { SUCCESS } = require('../../helpers/');

const deleteTransaction = async (req, res) => {
  const { _id, balance } = req.user;
  const { transactionId } = req.params;
  const transaction = await Transaction.findOneAndRemove({ _id: transactionId, owner: _id });

  if (!transaction) {
    throw new NotFound(`Transaction with id=${transactionId} is not found`);
  }

  const { amount, transactionType } = transaction;

  const updateAfterDelete = transactionType === 'income' ? balance - amount : balance + amount;
  await User.findByIdAndUpdate({ _id }, { balance: updateAfterDelete });

  res.json({
    status: 'success',
    code: SUCCESS,
    message: 'Success remove',
    data: {
      transaction,
      balance: updateAfterDelete,
    },
  });
};

module.exports = deleteTransaction;
