const express = require('express');
const transactionRouter = require('./tx.route');
const blockRouter = require('./block.route');

const app = express();

app.use('/tx', transactionRouter);
app.use('/block', blockRouter);

module.exports = app;