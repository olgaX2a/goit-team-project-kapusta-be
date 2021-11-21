const { SUCCESS } = require('../../helpers/index');

const currentUser = async (req, res) => {
  const { token, name: userName, email: userEmail, balance } = req.user;

  if (token) {
    res.status(SUCCESS).json({
      status: 'authorized',
      code: SUCCESS,
      data: {
        userName,
        userEmail,
        token,
        balance,
      },
    });
  }
};

module.exports = currentUser;
