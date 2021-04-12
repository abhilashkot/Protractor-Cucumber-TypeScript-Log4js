// Copyright Koninklijke Philips N.V. 2020
import { $, ElementFinder } from 'protractor';

export class DownloadLocators {
   public SignUp: ElementFinder;

   public UserName: ElementFinder;

   public Password: ElementFinder;

   public CloseButton: ElementFinder;

   public Login: ElementFinder;

   constructor() {
      this.SignUp = $('a[data-target="#signInModal"]');

      this.UserName = $('#sign-username');

      this.Password = $('#sign-password');

      this.CloseButton = $('div#signInModal .btn-secondary');

      this.Login = $('button[onclick="register()"]');
   }
}
