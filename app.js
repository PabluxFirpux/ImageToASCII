const getPixels = require('get-pixels');
const sharp = require('sharp'); // Maybe resize images to smaller before processing for better results
const transcriber = require('./transcriber');
const htmlGenerator = require('./htmlGenerator');

const sizeW = Math.floor(process.stdout.columns / 10) * 10;
const sizeH = Math.floor(process.stdout.rows / 10) * 10;
//let img = sharp('./resources/flag.png').resize(sizeW < sizeH ? sizeW : (null, sizeH)).toFile('./resources/flagS2.jpg');
let img = sharp('./resources/todos.jpg').resize(400).toFile('./resources/flagS2.jpg');

getPixels('./resources/flagS2.jpg', function(err, pixels) {
	if (err) {
		console.log('Bad image path');
		return;
	}
	const ASCIIimage = transcriber(pixels);
	htmlGenerator(ASCIIimage);
	// transcriber(pixels);
});
