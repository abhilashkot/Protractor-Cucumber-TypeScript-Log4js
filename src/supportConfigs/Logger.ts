// Copyright Koninklijke Philips N.V. 2020
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const today = new Date();
const date =
   today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time =
   today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
const dateTime = date + ' ' + time;
/**
 * Logger class
 */
export class Log {
   /** Log
    * Log step logs should match with test case
    *
    * @param stepNo stepNo
    * @param logMessage logMessage
    */
   public static async logStep(stepNo: number, logMessage: string) {
      console.log(
         '[' +
            dateTime +
            ']' +
            ' - STEP - ' +
            stepNo.toString() +
            ' ' +
            logMessage
      );
   }

   /**
    * Log fail logs
    *
    * @param logMessage logMessage
    */
   public static async fail(logMessage: string) {
      console.log('[' + dateTime + ']' + ' - FAIL - ' + ' ' + logMessage);
   }

   /**
    * Log Pass logs
    *
    * @param logMessage logMessage
    */
   public static async pass(logMessage: string) {
      console.log('[' + dateTime + ']' + ' - PASS - ' + ' ' + logMessage);
   }

   /**
    * Log Error logs
    *
    * @param logMessage logMessage
    */
   public static async error(logMessage: string) {
      console.log('[' + dateTime + ']' + ' - ERROR - ' + ' ' + logMessage);
   }

   /**
    * Log Error logs
    *
    * @param logMessage logMessage
    */
   public static async info(logMessage: string) {
      console.log('[' + dateTime + ']' + ' - Info - ' + ' ' + logMessage);
   }
}
