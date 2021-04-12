// Copyright Koninklijke Philips N.V. 2020
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable header/header */

import { browser, by, element, ElementFinder } from 'protractor';
import { ExpectedConditions as until } from 'protractor';
import { Log4jsconfig } from '../supportConfigs/Log4jsconfig';

export class Common {
   public delayInMilliSeconds = 1000;

   /**
    * Delay :- Sleep for defined time in sec
    * @param _sec seconds
    */
   public async Sleep(_sec: number) {
      Log4jsconfig.Log().info('Sleep for ' + _sec + 'sec');
      await browser.sleep(_sec * this.delayInMilliSeconds);
   }

   /**
    * WaitForElementToBeAvailable :- Wait for element to be available for defined time in sec,
    * if element is not available after defined time throw the _findElementFailedMessage message
    * @param _element : Element to be found
    * @param _delayInSec : Delay in sec
    * @param _findElementFailedMessage : Message to be logged if the element is not found after waiting for _deleyinSec sec
    */
   public async WaitForElementToBeAvailable(
      _element: ElementFinder,
      _delayInSec: number,
      _findElementFailedMessage: string
   ) {
      Log4jsconfig.Log().info(
         'Wait for ' + _delayInSec + 'sec for element to be visible'
      );
      await browser
         .wait(
            until.elementToBeClickable(_element),
            _delayInSec * 1000,
            _findElementFailedMessage
         )
         .then(function (bool) {
            Log4jsconfig.Log().info(bool);
         });
      Log4jsconfig.Log().info('Element was visible');

      return true;
   }

   /**
    * Get teh display text of the element
    * @param _elementLocator css selector of web element of the element
    */
   public async GetDisplayTextOfElement(_elementLocator: string) {
      Log4jsconfig.Log().info('Fetch the display text of the element');
      const displayText = await element(by.css(_elementLocator)).getText();
      Log4jsconfig.Log().info('Display text of element = ' + displayText);

      return displayText;
   }

   /**
    * Wait till display text matches for th element
    * @param _elementLocator Element for which we need to wait till displayed text matches
    * @param _displayText Display text to be matched
    * @param _waitForSec Wait in seconds
    */
   public async WaitTillDisplayTextMatches(
      _elementLocator: ElementFinder,
      _displayText: string,
      _waitInSec: number
   ) {
      let wait = 1;
      do {
         wait++;
         if (wait === _waitInSec) {
            Log4jsconfig.Log().info('Display text does not match');

            return false;
         }
      } while ((await _elementLocator.getText()) !== _displayText);
      Log4jsconfig.Log().info('Display text matches');

      return true;
   }

   /**
    * Wait for till element is removed from UI
    * @param _element element css selector
    * @param _delayInSec Wait for these many seconds
    * @param _findElementFailedMessage Failed message if element is not disabled from UI
    */
   public async WaitTillElementIsNotPresent(
      _element: ElementFinder,
      _delayInSec: number,
      _findElementFailedMessage: string
   ) {
      await browser
         .wait(
            until.not(until.elementToBeSelected(_element)),
            _delayInSec * 1000,
            _findElementFailedMessage
         )
         .then(function (bool) {
            Log4jsconfig.Log().info(bool);
         });
      Log4jsconfig.Log().info('Element was visible');

      return true;
   }

   /**
    * verify whether check box is selected
    * @param _elementCheckBox Checkbox element
    */
   public async VerifyCheckBoxIsSelected(_elementCheckBox: ElementFinder) {
      Log4jsconfig.Log().info('Check if check box is selected');
      if (_elementCheckBox.isSelected()) {
         Log4jsconfig.Log().info('Check box is selected');

         return true;
      }

      return false;
   }

   /**
    * Launch URL
    * @param _url URL that has to be launched
    */

   public async LaunchURL(_url: URL) {
      await browser.get(_url.toString()).then(function (bool) {
         Log4jsconfig.Log().info(bool);
      });
      await this.Sleep(2);
   }

   /**
    * Get the URL of the page after resolving promise
    */
   public async GetCurrentURL() {
      return await browser.getCurrentUrl();
   }

   /**
    * Get the title of the page after resolving promise
    */
   public async GetTitle() {
      return await browser.getTitle();
   }

   /**
    * Get job data for particular row and column
    * @param _row
    * @param _col
    */
   public async ReplaceString(
      _partialStringToBeReplaced: string,
      _stringToBeReplacedWith: string,
      _originalString: string
   ) {
      Log4jsconfig.Log().info('Fetch the first data');

      const rowregx = '/' + _partialStringToBeReplaced + '/gi';

      Log4jsconfig.Log().info('replace the row and column data');

      return _originalString.replace(rowregx, _partialStringToBeReplaced);
   }

   public async WaitTillElementAvailableAndContinue(
      _delay: number,
      _element: ElementFinder
   ) {
      Log4jsconfig.Log().info('$$WaitTillElementAvailableAndContinue');

      for (let i = 0; i <= _delay; i++) {
         await this.Sleep(1);
         while (await _element.isDisplayed()) {
            Log4jsconfig.Log().info('Element is visible');

            return true;
         }
      }
      Log4jsconfig.Log().info('Element is not visible');

      return false;
   }
}
