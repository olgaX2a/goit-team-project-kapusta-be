const Transaction = require("../../model/transaction");
const { nanoid } = require("nanoid");

const addTransaction = async (req, res) => {
  const { transactionType } = req.params;
  const { amount, description, category, day, month, year } = req.body;
  const newTransaction = {
    id: nanoid(),
    owner: req.user._id,
    transactionType,
    ...req.body,
  };
  await Transaction.create(newTransaction);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      transactionType,
      amount: amount.toFixed(2),
      description,
      category,
      day,
      month,
      year,
    },
  });
};

module.exports = addTransaction;
