const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  logout,
  verify,
  balanceUpdate,
} = require("../../controllers/user");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");

const { joiSchema } = require("../../model/user.js");
router.post(
  "/registration",
  validation(joiSchema),
  controllerWrapper(registration)
);

router.post("/login", validation(joiSchema), controllerWrapper(login));
router.get("/verify/:verifyToken", controllerWrapper(verify));
router.post("/logout", authenticate, controllerWrapper(logout));
router.patch("/balance", authenticate, controllerWrapper(balanceUpdate));

module.exports = router;
