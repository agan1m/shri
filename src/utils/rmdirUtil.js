var fs = require('fs');

const rmdirAsync = function(path, callback) {
	fs.readdir(path, function(err, files) {
		if (err) {
			callback(err, []);
			return;
		}
		let wait = files.length,
			count = 0,
			folderDone = function(err) {
				count++;
				if (count >= wait || err) {
					fs.rmdir(path, callback);
				}
			};

		if (!wait) {
			folderDone();
			return;
		}

		path = path.replace(/\/+$/, '');
		files.forEach(function(file) {
			let curPath = path + '/' + file;
			fs.lstat(curPath, function(err, stats) {
				if (err) {
					callback(err, []);
					return;
				}
				if (stats.isDirectory()) {
					rmdirAsync(curPath, folderDone);
				} else {
					fs.unlink(curPath, folderDone);
				}
			});
		});
	});
};

module.exports = rmdirAsync;
