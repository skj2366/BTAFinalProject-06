const express = require('express');
const tx = require('../controllers/tx.controller');

const router = express.Router();

router.get('/', tx.searchTx);
router.get('/:transactionId', tx.getTxById);

module.exports = router;