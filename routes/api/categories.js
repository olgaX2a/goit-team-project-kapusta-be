const express = require('express');
const router = express.Router();
const { getCategory } = require('../../controllers/categories/index');
const { controllerWrapper, authenticate } = require('../../middlewares');

router.get('/:transactionType', authenticate, controllerWrapper(getCategory));

module.exports = router;
