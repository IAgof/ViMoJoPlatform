"use strict";
let fs = require('fs');

// abstract writing screen shot to a file
function writeScreenShot(data, filename) {
	console.log("Writing screenshot...");
	let stream = fs.createWriteStream(filename);
	stream.write(new Buffer(data, 'base64'));
	stream.end();
	console.log("...done!");
}

function clearBrowserStorage(browser) {
	browser.executeScript('window.sessionStorage.clear();').catch(e => console.log("empty storage"));
	browser.executeScript('window.localStorage.clear();').catch(e => console.log("empty storage"));
}

module.exports = {
	writeScreenShot,
	clearBrowserStorage
}