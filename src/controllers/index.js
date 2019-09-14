const fs = require('fs');
const path = require('path');
const rmDir = require('../utils/rmdirUtil');

exports.getReposList = (req, res) => {
	fs.readdir(global.reposPath, (err, files) => {
		if (err) {
			throw err;
		}

		res.json({ data: files });
	});
};

exports.deleteRepoById = (req, res) => {
	const { repositoryId } = req.params;

	rmDir(path.join(global.reposPath, repositoryId), (err) => {
		if (err) {
			throw err;
		}
		res.json({ data: {}, isSuccess: true });
	});
};
