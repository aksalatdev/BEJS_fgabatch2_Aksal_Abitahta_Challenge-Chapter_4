const express = require('express');
const router = express.Router();
const transactionController = require('../../../controllers/transactionController');

router.post('/transactions', transactionController.createTransaction);
router.get('/transactions', transactionController.getTransactions);
router.get('/transactions/:transactionId', transactionController.getTransactionById);

module.exports = router;
