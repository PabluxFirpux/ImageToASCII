const fs = require('fs');

const turnASCII = (matrix) => {
	const array = Array.from(matrix.data);
	const width = matrix.shape[0];
	const height = matrix.shape[1];
	const size = width * height * 4;
	let brightnessArray = turnBrightness(array, size);
	let TwoDArray = turn2D(brightnessArray, width, height);
	let textArray = toText(TwoDArray);
	return arrayToHtmlArray(textArray);
};

const arrayToHtmlArray = (array) => {
	var htmlArray = [];
	htmlArray.push('\n');
	for (var i = 0; i < array.length; i++) {
		var mec = '';
		for (var j = 0; j < array[0].length; j++) {
			mec += array[i][j];
		}
		htmlArray.push(mec);
	}
	return htmlArray;
};

const printASCIIFile = (array) => {
	try {
		fs.unlinkSync('ascii.txt');
	} catch (err) {
		console.error(err);
	}

	for (var i = 0; i < array.length; i++) {
		var mec = '';
		for (var j = 0; j < array[0].length; j++) {
			mec += array[i][j];
			mec += ' '; //Removable
		}
		fs.appendFile('ascii.txt', mec + '\n', function(err) {
			if (err) throw err;
		});
	}
};

const printASCII = (array) => {
	for (var i = 0; i < array.length; i++) {
		var mec = '';
		for (var j = 0; j < array[0].length; j++) {
			mec += array[i][j];
		}
		console.log(mec);
	}
};

const toText = (array) => {
	var density = ' .:-=+*#%@';
	//var density = ' _.,-=+:;cba!?0123456789$W#@Ñ';
	density = density.split('').reverse().join('');

	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[0].length; j++) {
			toAdd = density[Math.floor(array[i][j] / 255 * density.length)];
			if (toAdd == undefined) {
				toAdd = ''; //Añadir un espacio pero no creo que sea necesario
			}
			array[i][j] = toAdd;
		}
	}
	return array;
};

const turn2D = (array, width, height) => {
	var twoDArray = [];
	for (var i = 0; i < height; i++) {
		var row = [];
		for (var j = 0; j < width; j++) {
			row.push(array[i * width + j]);
		}
		twoDArray.push(row);
	}
	return twoDArray;
};

const turnBrightness = (array, size) => {
	var brightnessArray = [];
	for (var i = 0; i < size; i += 4) {
		brightnessArray.push(Math.floor((array[i] + array[i + 1] + array[i + 2]) / 3));
	}
	return brightnessArray;
};

module.exports = turnASCII;
