/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable header/header */
/* eslint-disable @typescript-eslint/no-var-requires */
// Copyright Koninklijke Philips N.V. 2020
import { browser, Config } from 'protractor';
import { Reporter } from './src/supportConfigs/Reporter';
const jsonReports = process.cwd() + '/reports/json';
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const reporter = new HtmlScreenshotReporter({
    dest: 'target/screenshots',
    filename: 'my-report.html',
});

export const config: Config = {
    // Setup the report before any tests start
    beforeLaunch: function () {
        return new Promise(function (resolve) {
            reporter.beforeLaunch(resolve);
        });
    },

    // Close the report after all tests finish
    afterLaunch: function (exitCode) {
        return new Promise(function (resolve) {
            reporter.afterLaunch(resolve.bind(exitCode));
        });
    },

    getPageTimeout: 6000000,
    framework: 'custom',
    //directConnect: true,
    seleniumAddress:
        'http://abhilash.kotabagi@philips.com:u06663e51fe80004@hub.crossbrowsertesting.com:80/wd/hub',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: {
        user: 'abhilash.kotabagi@philips.com', //replace with your email address
        password: 'u06663e51fe80004', //replace with your authkey
        record_Video: 'true',
        record_network: 'true',
        browserName: 'chrome',
        platform: 'Windows 7',
        //chromeOptions: {
        //    args: ['--disable-web-security', '--user-data-dir=~/.e2e-chrome-profile'],
        //},
    },

    onPrepare: () => {
        browser.ignoreSynchronization = true;
        Reporter.createDirectory(jsonReports);
        //browser.manage().window().maximize();
    },
    specs: ['../src/Features/*/*.feature'],
    cucumberOpts: {
        compiler: 'ts:ts-node/register',
        format: 'json:./reports/json/cucumber_report.json',
        require: [
            '../jsConverted/src/stepDefinition/*/*.js',
            '../jsConverted/src/supportConfigs/*.js',
        ],
        strict: true,
        tags: '@UploadAndDownloadReliability',
    },
    onComplete: () => {
        Reporter.createHTMLReport();
    },
};
