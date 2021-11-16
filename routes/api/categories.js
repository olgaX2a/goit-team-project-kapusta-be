const express = require('express');
const router = express.Router();
const { getCategory, getAllByCategory } = require('../../controllers/categories/index');
const { controllerWrapper, authenticate } = require('../../middlewares');

router.get('/', authenticate, controllerWrapper(getCategory));
router.get('/all', authenticate, controllerWrapper(getAllByCategory));

module.exports = router;
