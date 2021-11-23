const jwt = require('jsonwebtoken');
const { User } = require('../model/user.js');
const { UNAUTHORIZED } = require('../helpers/index');

const { SECRET_KEY } = process.env;

async function authenticate(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(UNAUTHORIZED).json({
      status: 'error',
      code: UNAUTHORIZED,
      message: 'Not authorized',
    });
    return;
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    res.status(UNAUTHORIZED).json({
      status: 'error',
      code: UNAUTHORIZED,
      message: 'Not authorized',
    });
    return;
  }
  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(_id);
    if (!user.token) {
      res.status(UNAUTHORIZED).json({
        status: 'error',
        code: UNAUTHORIZED,
        message: 'Not authorized',
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({
      status: 'error',
      code: UNAUTHORIZED,
      message: 'Not authorized',
    });
    return;
  }
}

module.exports = authenticate;
