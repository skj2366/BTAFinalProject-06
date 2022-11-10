const express = require('express');
const account = require('../controllers/account.controller');

const router = express.Router(); 

router.get('/', account.searchAccount);
router.get('/:accountId', account.getAccountById);


module.exports = router;