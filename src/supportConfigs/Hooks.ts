/* eslint-disable header/header */
/* eslint-disable @typescript-eslint/no-var-requires */
// Copyright Koninklijke Philips N.V. 2020

import { browser } from 'protractor';
import { BeforeAll, After, AfterAll, Status } from 'cucumber';

/**
 * This method will run before each tests
 */
BeforeAll({ timeout: 1000 * 1000 }, async () => {
    const log4js = require('log4js');
    log4js.configure('./log4js.json');
    //Need to implement still
});

/**
 * This method will run after complete test set is executed
 * and if the script fails it will capture the screen shoot(Under development)
 */
After(async function (scenario: { result: { status: unknown } }) {
    if (scenario.result.status === Status.FAILED) {
        //screenShot is a base-64 encoded PNG
        //const screenShot = await browser.takeScreenshot();
        //this.attach(screenShot, "image/png");
    }
});

/**
 * This method runs after each test
 */
AfterAll({ timeout: 100 * 1000 }, async () => {
    await browser.quit();
});
