'use strict';
const express = require('express');
const router = require('./routes');

global.reposPath = process.argv[2];

const app = express();

app.use('/api', router);

app.use((req, res) => {
	res.status(404).json({ message: 'Not found' });
});

const server = app.listen(3000, () => {
	console.log(
		`server running at port http://localhost/${server.address().port}`
	);
});
