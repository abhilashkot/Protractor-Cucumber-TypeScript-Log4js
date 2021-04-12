// Copyright Koninklijke Philips N.V. 2020
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

/**
 * This class will create the instance of log4js
 */
export class Log4jsconfig {
    static Log(): any {
        const log4js = require('log4js');
        const log = log4js.getLogger('default');
        return log;
    }
}
