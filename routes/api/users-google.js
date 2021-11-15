const express = require('express');
const router = express.Router();
const tryCatchWrapper = require('../../middlewares/try-catch-wrapper');
const { googleAuth, googleRedirect } = require('../../controllers/user/googleAuth');

router.get('/google', tryCatchWrapper(googleAuth));

router.get('/google-redirect', tryCatchWrapper(googleRedirect));

module.exports = router;
