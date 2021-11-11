const { User } = require("../../model/index");

const balanceUpdate = async (req, res) => {
  const { _id } = req.user;
  const { balance } = req.body;
  
  await User.findByIdAndUpdate(_id, { balance });
  res.status(201).json({
    status: "success",
    code: 201,
    balance: balance.toFixed(2),
  });
};

module.exports = balanceUpdate;
