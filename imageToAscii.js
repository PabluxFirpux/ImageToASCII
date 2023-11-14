const getPixels = require('get-pixels');
const sharp = require('sharp'); // Maybe resize images to smaller before processing for better results
const transcriber = require('./transcriber');
const htmlGenerator = require('./htmlGenerator');
const imageDeleter = require('./imageDeleter');

// const sizeW = Math.floor(process.stdout.columns / 10) * 10;
// const sizeH = Math.floor(process.stdout.rows / 10) * 10;
//let img = sharp('./resources/flag.png').resize(sizeW < sizeH ? sizeW : (null, sizeH)).toFile('./resources/flagS2.jpg');
const createAsciiHTML = (path) => {
	console.log('Creating ASCII HTML');
	const proccessedImgPath = './out/img.jpg';
	let imgPath = path;
	if (!path) {
		console.log('No path provided');
		return;
	}

	let img = sharp(imgPath).resize(400).toFile(proccessedImgPath);

	getPixels(proccessedImgPath, function(err, pixels) {
		if (err) {
			console.log('Bad image path');
			return;
		}
		const ASCIIimage = transcriber(pixels);
		htmlGenerator(ASCIIimage);
		imageDeleter(proccessedImgPath);
	});
};

module.exports = createAsciiHTML;
