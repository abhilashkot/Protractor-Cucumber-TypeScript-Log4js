// Copyright Koninklijke Philips N.V. 2020
import * as reporter from 'cucumber-html-reporter';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

const jsonReports = path.join(process.cwd(), '/reports/json');
const htmlReports = path.join(process.cwd(), '/reports/html');
const targetJson = jsonReports + '/cucumber_report.json';

const cucumberReporterOptions = {
    jsonFile: targetJson,
    output: htmlReports + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true,
    theme: 'bootstrap',
    screenshotsDirectory: 'screenshots/',
    storeScreenshots: true,
    reoportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        'App Name': 'Dicom Study Browser',
    },
};

export class Reporter {
    /**
     * This method will create directory
     * @param dir
     */
    public static createDirectory(dir: string): void {
        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
    }

    /**
     * This method will generate HTML report
     */
    public static createHTMLReport(): void {
        try {
            reporter.generate(cucumberReporterOptions); // invoke cucumber-html-reporter
        } catch (err) {
            if (err) {
                throw new Error('Failed to save cucumber test results to json file.');
            }
        }
    }
}
