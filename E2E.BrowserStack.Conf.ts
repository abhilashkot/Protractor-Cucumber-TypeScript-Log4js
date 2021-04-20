// Copyright Koninklijke Philips N.V. 2020
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { browser } from 'protractor';
import { Reporter } from './src/supportConfigs/Reporter';
import path from 'path';
import fsExtra from 'fs-extra';
import browserstack from 'browserstack-local';
const jsonReports = process.cwd() + '/reports/json';

exports.config = {
   // Setup the report before any tests start
   beforeLaunch: function () {
      console.log('Connecting local');
      const browserStackLogsPath = './Output/logs/';
      fsExtra.mkdirpSync(browserStackLogsPath);

      return new Promise<void>(function (resolve, reject) {
         exports.bs_local = new browserstack.Local();
         exports.bs_local.start(
            {
               key: process.env['CPSE_2f276661_dc8a_4637_b6df_84686ba755e5'],
               forceLocal: true,
               binarypath:
                  '../node_modules/browserstack-binaries/binaries/win/BrowserstackLocal.exe',
               //proxyHost: 'emea.zscaler.philips.com',
               //proxyPort: '9480',
               logFile: path.resolve(
                  browserStackLogsPath + 'browserstack-local.log'
               ),
            },
            function (error: any) {
               if (error) {
                  return reject(error);
               }
               console.log('Connected. Now testing...');
               resolve();
            }
         );
      });
   },

   // Close the report after all tests finish
   afterLaunch: function () {
      return new Promise(function (resolve) {
         exports.bs_local.stop(resolve);
      });
   },

   getPageTimeout: 600000,
   framework: 'custom',
   seleniumAddress: 'http://localhost:4444/wd/hub',
   //webDriverProxy: 'http://emea.zscaler.philips.com:9480',
   frameworkPath: require.resolve('protractor-cucumber-framework'),
   verboseMultiSessions: false,
   commonCapabilities: {
      resolution: '1280x1024',
      'browserstack.user':
         process.env['<<>>'],
      'browserstack.key':
         process.env['<<>>'],
      'browserstack.local': 'true',
      'browserstack.video': 'true',
      'browserstack.debug': 'true',
      project: 'Protractor Reporting UI Tests',
   },
   multiCapabilities: [
      {
         os: 'Windows',
         os_version: '10',
         browserName: 'chrome',
      },
      {
         os: 'Windows',
         os_version: '10',
         browserName: 'internet explorer',
         browser_version: '11',
      },
   ],

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
      tags: '@LoginValid',
   },
   onComplete: () => {
      Reporter.createHTMLReport();
   },
};
