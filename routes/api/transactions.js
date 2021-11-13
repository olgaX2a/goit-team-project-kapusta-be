const express = require('express');
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getAllTransactions,
} = require('../../controllers/transaction/index');
const { controllerWrapper, authenticate } = require('../../middlewares');

router.get('/:transactionType', authenticate, controllerWrapper(getTransactions));
router.get('/', authenticate, controllerWrapper(getAllTransactions));
router.post('/:transactionType', authenticate, controllerWrapper(addTransaction));

router.delete('/:transactionId', authenticate, controllerWrapper(deleteTransaction));

module.exports = router;
