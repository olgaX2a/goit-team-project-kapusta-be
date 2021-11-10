const { User } = require("../../model/user.js");
const { Transaction } = require("../../model/index");
const { NotFound } = require('http-errors');


const deleteTransactions = async (req, res) => {
  const { _id } = req.user;
  // console.log(req.user)
  const { transactionId } = req.params;
  // console.log(transactionId)
  const transaction = await Transaction.findOneAndRemove({ _id: transactionId, owner: user._id});
  console.log(transaction)
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
