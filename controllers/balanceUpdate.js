const { User } = require("../model/user");

const balanceUpdate = async (req, res) => {
  const { _id } = req.user;
  const { balance } = req.body;

  await User.findByIdAndUpdate(_id, { balance });
  res.status(201).json({
    status: "success",
    code: 201,
    data: balance,
  });
};

module.exports = balanceUpdate;
