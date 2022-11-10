const express = require('express');
const transactionRouter = require('./tx.route');
const blockRouter = require('./block.route');
const accountRouter = require('./account.route');

const app = express();

app.get('/', (req, res) => {
	res.send('respond with a resource');
});

app.use('/tx', transactionRouter);
app.use('/block', blockRouter);
app.use('/account', accountRouter);

module.exports = app;