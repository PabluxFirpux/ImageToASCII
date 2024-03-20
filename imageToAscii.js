const sharp = require('sharp'); // Maybe resize images to smaller before processing for better results
const transcriber = require('./transcriber');
const htmlGenerator = require('./htmlGenerator');

const createAsciiHTML = async (path) => {
	console.log('Creating ASCII HTML');
	const proccessedImgPath = './out/img.jpg';
	let imgPath = path;
	if (!path) {
		console.log('No path provided');
		return;
	}

	let buf = await sharp(imgPath).raw().resize(400).toBuffer((err, buff, info) => {
		const ASCIIimage = transcriber(buff, info.width, info.height);
		htmlGenerator(ASCIIimage);
	});
};

module.exports = createAsciiHTML;
