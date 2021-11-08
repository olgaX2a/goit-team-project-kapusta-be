const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransactions,
} = require("../../controllers/transaction/");
const { controllerWrapper, authenticate } = require("../../middlewares");

// router.get(
//   authenticate, joiSchema,
//   "/:transactionType",
//   controllerWrapper(getTransactions)
// );
router.post(
  "/:transactionType",
  authenticate,
  controllerWrapper(addTransaction)
);

module.exports = router;
