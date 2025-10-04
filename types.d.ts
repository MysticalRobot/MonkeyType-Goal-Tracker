declare interface Theme {
  mainColor: string;
  bgColor: string;
  subColor: string;
  textColor: string;
  errorColor: string;
}

declare type MessageResponse = {
  success: boolean;
  message: string;
};

declare interface Message {
  action:
  | 'updateIcon'
  | 'saveTimeTyping'
  | 'updateStreaks'
  | 'checkLoginStatus'
  | 'loadInfo';
}

declare type UpdateIconMessage = Message & {
  action: 'updateIcon';
  theme: Theme;
}

declare type SaveTimeTypingMessage = Message & {
  action: 'saveTimeTyping';
  timeTypingSeconds: number;
}

declare type UpdateStreaksMessage = Message & {
  action: 'updateStreaks';
  timeTyping: number;
}

declare type CheckLoginStatusMessage = Message & {
  action: 'checkLoginStatus';
}

declare type LoadInfoMessage = Message & {
  action: 'loadInfo';
}

declare type MonkeyTypeStatsRequest = {
  username: string;
  apeKey: string;
}

declare type MonkeyTypeStatsResponse = {
  message: string;
  data: Array<{
    timestamp: 0;
    testDuration: 1;
    afkDuration: 0;
    incompleteTestSeconds: 0;
    uid: "^a$";
    _id: "^a$";
    restartCount: 0;
  }>;
}

declare type BrowserStorage = {
  themes: Map<number, Theme>;
  timeTypingTodaySeconds: number;
  history: Array<[Date, number]>;
}
