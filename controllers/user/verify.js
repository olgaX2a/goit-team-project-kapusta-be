const path = require('path');
const { User } = require('../../model/index');
const { SUCCESS } = require('../../helpers/index');

const verify = async (req, res) => {
  const { verifyToken } = req.params;
  const user = await User.findOne({ verifyToken });

  if (!user) {
    const errorVerifyHtml = path.join(__dirname, '../../templates', 'errorVerifyPage.html');
    res.sendFile(errorVerifyHtml);
    return;
  }
  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
  const verifyHtml = path.join(__dirname, '../../templates', 'verifyPage.html');
  res.sendFile(verifyHtml);
  res.status(SUCCESS);
};

module.exports = verify;
