const { User } = require('../../model/index');
const { SUCCESS } = require('../../helpers/index');

const balanceUser = async (req, res) => {
  const { _id } = req.user;

  const { balance } = await User.findById(_id);
  res.status(SUCCESS).json({
    status: 'success',
    code: SUCCESS,
    balance,
  });
};

module.exports = balanceUser;
