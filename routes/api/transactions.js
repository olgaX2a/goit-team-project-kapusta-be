const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransactions,
} = require("../../controllers/transaction/index");
const { controllerWrapper, authenticate } = require("../../middlewares");

router.get(
  "/:transactionType",
  authenticate,
  controllerWrapper(getTransactions)
);
router.post(
  "/:transactionType",
  authenticate,
  controllerWrapper(addTransaction)
);

module.exports = router;
