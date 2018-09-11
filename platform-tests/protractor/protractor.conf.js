"use strict";

const VideoReporter = require('protractor-video-reporter');
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const Path = require('path');
const reportsPath = '/tmp/reports/';
const screenshotReporter = new HtmlScreenshotReporter({
	dest: Path.join(reportsPath, 'screenshots'),
	filename: 'platform-e2e-report.html'
});

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	framework: "jasmine2",
	beforeLaunch: function() {
		return new Promise(function(resolve){
			screenshotReporter.beforeLaunch(resolve);
		});
	},
	onPrepare: function () {
		let jasmineReporters = require('jasmine-reporters');
		jasmine.getEnv().addReporter(screenshotReporter);
		let reporterCurrentSpec = {
			specStarted: function(result) {
				this.name = result.fullName;
			}
		};
		jasmine.getEnv().addReporter(reporterCurrentSpec);
		jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
			consolidateAll: true,
			savePath: reportsPath,
			filePrefix: 'xmloutput'
		}));
		jasmine.getEnv().addReporter(new VideoReporter({
			// baseDirectory: Path.join(__dirname, 'reports/videos/')
			baseDirectory: Path.join(reportsPath, 'videos/')
		}));

	},
	afterLaunch: function(exitCode) {
		return new Promise(function(resolve){
			screenshotReporter.afterLaunch(resolve.bind(this, exitCode));
		});
	},
	specs: ['*spec.js'],
	// Chrome is not allowed to create a SUID sandbox when running inside Docker
	capabilities: {
		'browserName': 'chrome',
		'chromeOptions': {
			'args': ['no-sandbox']
		},
		'loggingPrefs': {
			'browser': 'ALL'
		}
	}
};