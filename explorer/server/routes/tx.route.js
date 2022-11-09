const express = require('express');
const tx = require('../controllers/tx.controller');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

router.get('/alltxs', tx.getAllTx);
router.get('/:transactionId', tx.getTxById);

module.exports = router;