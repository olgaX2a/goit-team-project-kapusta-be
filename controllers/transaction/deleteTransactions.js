const { Transaction } = require("../../model/index");
const { NotFound } = require('http-errors');


const deleteTransactions = async (req, res) => {
  const { _id } = req.user;
  const { transactionId } = req.params;
  const transaction = await Transaction.findOneAndRemove({ _id: transactionId, owner: _id});
  if (!transaction) {
    throw new NotFound(`Transaction with id=${transactionId} is not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success remove',
  });
};

module.exports = deleteTransactions;
