const express = require('express');
const router = express.Router();
const accountController = require('../../../controllers/accountController');

router.post('/accounts', accountController.createAccount);
router.get('/accounts', accountController.getAccounts);
router.get('/accounts/:accountId', accountController.getAccountById);

module.exports = router;
