// platform-tests/protractor/auth0.spec.js

"use strict";
require('jasmine-spec-name-patch');
require('jasmine-expect');
let testHelpers = require('./test_helpers');
let browserConsoleReporter = require('./browser_console_reporter');

let auth0_url = process.env.AUTH0_BASE_URI; // (jliarte): 11/09/18 expose backend AUTH0_BASE_URI
let frontendUrl = 'frontend';
let baseUrl = 'http://' + frontendUrl + ':8080';

describe ('User auth - auth0', function() {

  it('Should redirect to auth0 clicking Sign in button ', function () {
		browser.get(baseUrl);

    // TODO(jliarte): what happens if lang is ES?
    const signInButton = element.all(by.css('button.sign-in-button')).filter(e => e.isDisplayed()).first();
    signInButton.click();
		browser.sleep(2000);
    // TODO(jliarte): 11/09/18 as we leave the  angular app, we should use non protractor notation with browser.driver.
	  // see https://stackoverflow.com/a/48435267 for implementing login for all subsequent tests
		expect(browser.driver.getCurrentUrl()).toStartWith(auth0_url + '/login?');
  });

	afterEach(function () {
		testHelpers.clearBrowserStorage(browser);
	});

	afterEach(function () {
		browserConsoleReporter.reportBrowserConsoleLogs(this.fullName, browser);
	});

});
