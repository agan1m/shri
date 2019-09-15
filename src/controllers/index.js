const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
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

exports.getCommits = (req, res) => {
	const { repositoryId, commitHash = 'master' } = req.params;
	
	exec(`git log ${commitHash} --pretty=format:"%H-%an-%ad"`, {
		cwd: path.join(global.reposPath, repositoryId)
	}, (err, stdout) => {
		if(err) {
			throw err;
		}
		console.log(stdout)
		const data = stdout.split('\n').map(commit => {
			const parse = commit.split('-');
			return {
				hash: parse[0],
				author: parse[1],
				date: parse[2],
			}
		});
		res.json({data})
	})
};

exports.getDiffCommit = (req, res) => {
	const {repositoryId, commitHash} = req.params;

	exec(`git diff ${commitHash}^ --stat`, {
		cwd: path.join(global.reposPath, repositoryId),
	}, (err, stdout) => {
		if(err) {
			throw err;
		}
		res.json({
			data: stdout
		})
	})
};

exports.getTree = (req, res) => {
	const {repositoryId, path: pathParam, commitHash} = req.params;
	
	exec(`git ls-tree --full-tree ${commitHash || 'master'} ${pathParam || ''}`, {
		cwd: path.join(global.reposPath, repositoryId),
	}, (err, stdout) => {
		if(err) {
			throw err;
		}

		res.json({data: stdout})
	});
};

exports.getFileContent = (req, res) => {
	const {repositoryId, commitHash, pathToFile} = req.params;

	exec(`git show ${commitHash}:${pathToFile}`, {
		cwd: path.join(global.reposPath, repositoryId),
	}, (err, stdout) => {
		if(err) {
			throw err;
		}

		res.json({data: stdout})
	})
}