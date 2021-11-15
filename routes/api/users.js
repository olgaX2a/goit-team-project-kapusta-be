const express = require('express');
const router = express.Router();
const tryCatchWrapper = require("../../middlewares/try-catch-wrapper");
const { googleAuth, googleRedirect } = require("../../controllers/user/googleAuth");

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

router.get("/google", tryCatchWrapper(googleAuth));

router.get("/google-redirect", tryCatchWrapper(googleRedirect));

module.exports = router;
