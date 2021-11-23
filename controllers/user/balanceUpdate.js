const { User } = require('../../model/index');
const { CREATED } = require('../../helpers/index');

const balanceUpdate = async (req, res) => {
  const { _id } = req.user;
  const { balance } = req.body;

  await User.findByIdAndUpdate(_id, { balance });
  res.status(CREATED).json({
    status: 'success',
    code: CREATED,
    balance,
  });
};

module.exports = balanceUpdate;
