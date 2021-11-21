const { User } = require('../../model/index');

const balanceUser = async (req, res) => {
  const { _id } = req.user;

  const { balance } = await User.findById(_id);
  res.status(200).json({
    status: 'success',
    code: 200,
    balance,
  });
};

module.exports = balanceUser;
