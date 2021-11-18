const currentUser = async (req, res) => {
  const { token, name: userName, email: userEmail, balance } = req.user;

  if (token) {
    res.status(200).json({
      status: 'authorized',
      code: 200,
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
