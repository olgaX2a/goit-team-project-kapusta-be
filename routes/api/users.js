const express = require('express');
const router = express.Router();
const {
  registration,
  login,
  logout,
  verify,
  balanceUpdate,
  currentUser,
} = require('../../controllers/user');
const { controllerWrapper, validation, authenticate } = require('../../middlewares');

const { userJoiSchema, balanceJoiSchema } = require('../../model/user.js');
router.post('/registration', validation(userJoiSchema), controllerWrapper(registration));

router.get('/verify/:verifyToken', controllerWrapper(verify));
router.post('/login', validation(userJoiSchema), controllerWrapper(login));
router.get('/current', authenticate, controllerWrapper(currentUser));
router.post('/logout', authenticate, controllerWrapper(logout));
router.patch(
  '/balance',
  authenticate,
  validation(balanceJoiSchema),
  controllerWrapper(balanceUpdate),
);

module.exports = router;
