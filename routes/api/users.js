const express = require('express');
const router = express.Router()
const { registration } = require("../../controllers");
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require("../../middlewares");
const { joiSchema } = require("../../model/user");

router.post(
    "/registration",
    validation(joiSchema),
    controllerWrapper(registration)
  );

module.exports = router;