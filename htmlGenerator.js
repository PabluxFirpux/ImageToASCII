const fs = require('fs');
const htmlparser = require('node-html-parser');

const htmlGenerator = (textArray) => {
	copyTemplateToOutput();
	addTextToTemplate(textArray);
};

const addTextToTemplate = (textArray) => {
	const root = htmlparser.parse(fs.readFileSync('./out/image.html', 'utf8'));
	var body = root.querySelector('body');
	var text = body.getElementsByTagName('pre')[0];
	text.set_content(textArray.join('\n'));
	fs.writeFileSync('./out/image.html', root.toString(), 'utf8');
};

const copyTemplateToOutput = () => {
	if (fs.existsSync('./out/image.html')) {
		fs.unlinkSync('./out/image.html');
	}
	const path = require('path');
	const dir = './out';
	const template = './resources/template.html';
	const output = './out/image.html';
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	fs.copyFileSync(template, output, fs.constants.COPYFILE_EXCL, (err) => {
		if (err) throw err;
		console.log('Template copied to output');
	});
};

module.exports = htmlGenerator;
