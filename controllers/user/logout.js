const { User } = require('../../model/user.js');
const { SUCCESS } = require('../../helpers/index');

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.json({
    status: 'success',
    code: SUCCESS,
    message: 'Success logout',
  });
};

module.exports = logout;
