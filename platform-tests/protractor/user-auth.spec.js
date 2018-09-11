"use strict";
require('jasmine-spec-name-patch');
let testHelpers = require('./test_helpers');
let browserConsoleReporter = require('./browser_console_reporter');

let frontendUrl = 'frontend';
let baseUrl = 'http://' + frontendUrl + ':8080';

describe ('User auth', function() {
	let userEmail = 'user6@name.com';
	let userPassword = 'userPass';
	let userName = 'User Name';

  // TODO(jliarte): 11/09/18 auth not done by us anymore
  // it('Should redirect to /register clicking Register button ', function () {
		// browser.get(baseUrl);
		// // TODO(jliarte): what happens if lang is ES?
		// element(by.buttonText('Register')).click();
		// browser.sleep(2000);
		// expect(browser.getCurrentUrl()).toEqual(baseUrl + '/register');
  // });

  // TODO(jliarte): 11/09/18 auth not done by us anymore
	// it('Should be able to register a user account', function () {
	// 	browser.get(baseUrl + '/register');
  //
	// 	element(by.model('Register.username')).sendKeys(userName);
	// 	element(by.model('Register.email')).sendKeys(userEmail);
	// 	element(by.model('Register.password')).sendKeys(userPassword);
  //
	// 	element(by.buttonText('Register')).click(); // enter register - step2
  //
	// 	expect(element(by.css('div.credentials-errors')).isDisplayed()).toBeFalsy();
	// 	element(by.model('Register.terms')).click();
	// 	expect(element(by.model('Register.terms')).getAttribute('checked')).toBeTruthy();
	// 	expect(element(by.css('[ng-click="Register.submit()"]')).isDisplayed()).toBeTruthy();
  //
	// 	element(by.css('[ng-click="Register.submit()"]')).click(); // finalize register
	// 	let errors = element.all(by.css('.credentials-errors li'));
	// 	expect(errors.count()).toBe(0);
  //
	// 	browser.sleep(5000);
	// 	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/gallery');
	// });

  // TODO(jliarte): 11/09/18 auth not done by us anymore
	// it('Should redirect to /login clicking Login button ', function () {
	// 	browser.get(baseUrl);
	// 	// TODO(jliarte): what happens if lang is ES?
	// 	element(by.buttonText('Login')).click();
	// 	browser.sleep(2000);
	// 	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/login');
	// });

  // TODO(jliarte): 11/09/18 auth not done by us anymore
	// it('Should be able to login after creating an account', function () {
	// 	browser.get(baseUrl + '/login');
  //
	// 	element(by.model('Login.username')).sendKeys(userEmail);
	// 	element(by.model('Login.password')).sendKeys(userPassword);
  //
	// 	let loginButton = element(by.css('input.button-border'));
	// 	expect(loginButton.isDisplayed()).toBeTruthy();
	// 	loginButton.click();
  //
	// 	browser.sleep(5000);
	// 	expect(browser.getCurrentUrl()).toEqual(baseUrl + '/gallery');
	// });

	afterEach(function () {
		testHelpers.clearBrowserStorage(browser);
	});

	afterEach(function () {
		browserConsoleReporter.reportBrowserConsoleLogs(this.fullName, browser);
	});

});
