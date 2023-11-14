const fs = require('fs');

const imageDeleter = (path) => {
	fs.unlink(path, (err) => {
		if (err) {
			console.log('Error deleting image');
		}
	});
};

module.exports = imageDeleter;
