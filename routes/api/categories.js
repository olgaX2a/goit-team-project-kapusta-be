const express = require('express');
const router = express.Router();
const { getCategory } = require('../../controllers/categories/index');
const { controllerWrapper, authenticate } = require('../../middlewares');

router.get('/', authenticate, controllerWrapper(getCategory));

module.exports = router;
