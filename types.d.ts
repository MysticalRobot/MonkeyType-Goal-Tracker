type StringLengthRule = `${number | 'any'}=len`;
type StringEncodingRule = 'hex' | 'base64';
type StringEqualityRule = 'eq';
type StringDefaultRule = 'any';
declare type StringRule =
  | StringLengthRule | StringEncodingRule | StringEqualityRule | StringDefaultRule;
declare type StringValidationRulePrefix =
  | `${StringLengthRule},${StringEncodingRule}` | StringEqualityRule | StringDefaultRule;
declare type StringValidationRuleDelimiter = '?';
declare type StringValidationRule =
  `${StringValidationRulePrefix}${StringValidationRuleDelimiter}${string}`;

declare interface Theme {
  readonly mainColor: string;
  readonly bgColor: string;
}
declare type ThemeSchema = Theme & {
  readonly mainColor: StringValidationRule & '6=len,hex?';
  readonly bgColor: StringValidationRule & '6=len,hex?';
}

declare type UpdateIconRequest = Theme;
declare type UpdateIconRequestSchema = ThemeSchema;

declare interface UpdateIconResponse {
  readonly success: boolean;
  readonly message: string;
}
declare type UpdateIconResponseSchema = UpdateIconResponse & {
  readonly success: boolean;
  readonly message: StringValidationRule & 'any?';
};

declare interface UpdateStreaksRequest {
  readonly action: 'updateStreaks';
}
declare interface UpdateStreaksRequestSchema {
  readonly action: StringValidationRule & 'eq?updateStreaks';
}

declare interface StatsRequest {
  username: string;
  apeKey: string;
}
declare interface StatsResponse {
  message: string;
  data: [
    {
      wpm: 420;
      rawWpm: 420;
      charStats: null;
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

// TODO ensure that these values are replaced, not updated
declare type BrowserStorage = {
  iconDataURI: string;
  theme: Theme;
}
type IconDataURIValidationRule = StringValidationRule & 'any=len,base64?';
declare type BrowserStorageSchema = BrowserStorage & {
  readonly iconDataURI: IconDataURIValidationRule;
  readonly theme: ThemeSchema;
}
declare type BrowserStorageKey = keyof BrowserStorage;

declare interface SchemaContainer {
  readonly theme: ThemeSchema;
  readonly updateIconRequest: UpdateIconRequestSchema;
  readonly updateIconResponse: UpdateIconResponseSchema;
  readonly browserStorage: BrowserStorageSchema;
}
declare type Schema = SchemaContainer[keyof SchemaContainer];

declare type ValidationError = string | undefined;
