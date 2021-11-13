const currentUser = async (req, res) => {
  const { token, name, email } = req.user;

  if (token) {
    res.status(200).json({
      status: 'authorized',
      code: 200,
      data: {
        name,
        email,
      },
    });
  }
};

module.exports = currentUser;
