const express = require('express');
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getCategory,
} = require('../../controllers/transaction/index');
const { controllerWrapper, authenticate } = require('../../middlewares');

router.get('/:transactionType', authenticate, controllerWrapper(getTransactions));
router.get('/categories/:transactionType', authenticate, controllerWrapper(getCategory));
router.post('/:transactionType', authenticate, controllerWrapper(addTransaction));

router.delete('/:transactionId', authenticate, controllerWrapper(deleteTransaction));

module.exports = router;
