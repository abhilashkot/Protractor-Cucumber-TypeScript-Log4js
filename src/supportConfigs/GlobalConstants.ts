// Copyright Koninklijke Philips N.V. 2020

export class GlobalConstants {
   public GlobalDelay: number;

   public BaseURL: URL;

   public UserName: string;

   public Password: string;

   public DataSetPath: string;

   public StudyDownloadPath: string;

   public HtmlReportsPath: string;

   public ScreenShotPath: string;

   public HsdpTestOrg: string;

   public TimeOut: number;

   public WaitForStudyUploadORDownload: number;

   public DownloadLocation: string;

   constructor() {
      this.GlobalDelay = 1;
      this.TimeOut = 30;
      this.BaseURL = new URL('https://www.demoblaze.com/index.html');
      this.UserName = 'TestUser1';
      this.Password = 'TestPassword';
      this.ScreenShotPath = '';
      this.HtmlReportsPath = '';
      this.StudyDownloadPath = '';
      this.DataSetPath = '';
      this.HsdpTestOrg = '';
      this.WaitForStudyUploadORDownload = 120;
      this.DownloadLocation = 'C:/Users/Administrator/Downloads';
   }
}
