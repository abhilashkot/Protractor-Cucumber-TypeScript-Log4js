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
    directConnect: true,
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--disable-web-security', '--user-data-dir=~/.e2e-chrome-profile'],
        },
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
