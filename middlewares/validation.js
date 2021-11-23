const { BAD_REQUEST } = require('../helpers/index');

const validation = schema => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(BAD_REQUEST).json({
        status: 'error',
        code: BAD_REQUEST,
        message: error.message,
      });
      return;
    }
    next();
  };
};

module.exports = validation;
