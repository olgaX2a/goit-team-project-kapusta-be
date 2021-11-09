const { User, Transaction } = require("../../model/index");

const getTransactions = async (req, res) => {
  const { _id } = req.user;
  const { transactionType } = req.params;
  const transactionsById = await Transaction.find(
    { owner: _id },
    "_id amount description category transactionType day month year"
  );
  const result = transactionsById.filter(
    (transaction) => transaction.transactionType === transactionType
  );
  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

module.exports = getTransactions;
