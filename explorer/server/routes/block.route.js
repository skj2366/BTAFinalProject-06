const express = require('express');
const block = require('../controllers/block.controller');

const router = express.Router();

router.get('/', block.searchBlock);
router.get('/:blockNumber', block.getBlockByNumber);


module.exports = router;