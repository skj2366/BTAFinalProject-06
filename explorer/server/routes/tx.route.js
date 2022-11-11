const express = require('express');
const tx = require('../controllers/tx.controller');

const router = express.Router();

router.get('/', tx.searchTx);
router.get('/:txId', tx.getTxById);

module.exports = router;