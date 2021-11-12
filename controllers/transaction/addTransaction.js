const { BadRequest } = require("http-errors");
const { User, Transaction } = require("../../model/index");
const { updateBalanceAfterAddTransaction } = require("../../services/index");

const addTransaction = async (req, res) => {
  const { _id, balance } = req.user;
  const { transactionType } = req.params;
  const { amount, description, category, day, month, year } = req.body;
  const newTransaction = {
    owner: req.user._id,
    transactionType,
    ...req.body,
  };
  await Transaction.create(newTransaction);

  const newBalance = updateBalanceAfterAddTransaction(
    balance,
    amount,
    transactionType
  );

  if (newBalance < 0) {
    throw new BadRequest("The balance cannot be less than 0.");
  }

  await User.findByIdAndUpdate(_id, {
    balance: newBalance,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      balance: newBalance.toFixed(2),
      transaction: {
        transactionType,
        amount: amount.toFixed(2),
        description,
        category,
        day,
        month,
        year,
      },
    },
  });
};

module.exports = addTransaction;
