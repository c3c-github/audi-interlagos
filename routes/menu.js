const express = require('express');
const {menu, formPay, formVentures, formPrime, formCheckOut, formApp, thanks } = require('../controllers/menuController');
const router = express.Router();
router.get('/', menu);
router.get('/formPay', formPay);
router.get('/formVentures', formVentures);
router.get('/formPrime', formPrime);
router.get('/formCheckOut', formCheckOut);
router.get('/formApp', formApp);

router.post('/submit-form', thanks);

module.exports = router;