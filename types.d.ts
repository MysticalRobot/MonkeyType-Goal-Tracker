declare interface Theme {
  mainColor: string;
  bgColor: string;
}

declare type UpdateIconRequest = Theme;
declare interface UpdateIconResponse {
  success: boolean;
  message: string;
}

declare interface UpdateStreaksRequest {
  action: 'updateStreaks';
}

declare interface MonkeyTypeStatsRequest {
  username: string;
  apeKey: string;
}
declare interface MonkeyTypeStatsResponse {
  message: string;
  data: [
    {
      acc: 50;
      mode: "time";
      mode2: "^\\d$";
      quoteLength: 3;
      timestamp: 0;
      testDuration: 1;
      consistency: 100;
      keyConsistency: 100;
      uid: "^a$";
      restartCount: 0;
      incompleteTestSeconds: 0;
      afkDuration: 0;
      tags: [
        "^a$"
      ];
      bailedOut: true;
      blindMode: true;
      lazyMode: true;
      funbox: [
        58008
      ];
      language: "english";
      difficulty: "normal";
      numbers: true;
      punctuation: true;
      _id: "^a$";
      isPb: true
    }
  ]
}

declare type BrowserStorage = {
  iconDataURI: string;
  theme: Theme;
}
