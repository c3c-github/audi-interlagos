const express = require('express');
const {form, thanks } = require('../controllers/menuController');
const router = express.Router();
router.get('/', form);
router.post('/submit-form', thanks);

module.exports = router;