"use strict";
let path = require('path');
let fs = require('fs');

// create a new javascript Date object based on the timestamp
function timestampToDate(unix_timestamp) {
	let date = new Date(unix_timestamp);
	// hours part from the timestamp
	let hours = date.getHours();
	// minutes part from the timestamp
	let minutes = date.getMinutes();
	// seconds part from the timestamp
	let seconds = date.getSeconds();

	let timeValues = [hours, minutes, seconds];
	timeValues.forEach(function (val) {
		if (val.length < 2) {
			// padding
			val = '0' + val;
		}
	});
	// will display time in 10:30:23 format
	return hours + ':' + minutes + ':' + seconds;
}

function errorCallback(err) {
	console.log(err);
}

function getDateStr() {
	let date = (new Date() + '').replace(new RegExp(':', 'g'), '-').split(' ');
	// "2013-Sep-03-21:58:03"
	return [date[3], date[1], date[2], date[4]].join('-');
}

function reportBrowserConsoleLogs(specFullName, browser) {
	const specName = specFullName.replace(new RegExp(' ', 'g'), '-').replace(new RegExp('\/', 'g'), '_'),
		// specName = "lala",
		baseFileName = specName + '-' + getDateStr(),
		reportDir = path.resolve('/tmp/reports/'),
		consoleLogsDir = path.resolve(reportDir + '/logs/');
	// Flush browser console to file
	let logs = browser.driver.manage().logs(),
		logType = 'browser'; // browser
	logs.getAvailableLogTypes().then(function (logTypes) {
		if (logTypes.indexOf(logType) > -1) {
			let logFileName = path.resolve(consoleLogsDir + '/' + baseFileName + '.txt');
			browser.manage().logs().get(logType).then(function (logsEntries) {
				if (!fs.existsSync(consoleLogsDir)) {
					fs.mkdirSync(consoleLogsDir);
				}
				let len = logsEntries.length;
				for (let i = 0; i < len; ++i) {
					let logEntry = logsEntries[i];
					let msg = timestampToDate(logEntry.timestamp) + ' ' + logEntry.type + ' ' + logEntry.message;
					fs.appendFileSync(logFileName, msg + '\r\n', {encoding: 'utf8'}, errorCallback);
				}
			}, errorCallback);
		}
	});
}

module.exports = {
	reportBrowserConsoleLogs
};