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
type ColorValidationRule = StringValidationRule & '6=len,hex?';
declare type ThemeSchema = Theme & {
  readonly mainColor: ColorValidationRule;
  readonly bgColor: ColorValidationRule;
}

declare type UpdateIconRequest = Theme;
declare type UpdateIconRequestSchema = ThemeSchema;

declare interface UpdateIconResponse {
  readonly success: boolean;
  readonly message: string;
}
type MessageValidationRule = StringValidationRule & 'any?';
declare type UpdateIconResponseSchema = UpdateIconResponse & {
  readonly success: boolean;
  readonly message: MessageValidationRule;
};

declare interface ThemeRequest {
  readonly action: string;
}
type ActionValidationRule = StringValidationRule & 'eq?sendTheme';
declare type ThemeRequestSchema = ThemeRequest & {
  readonly action: ActionValidationRule;
}

declare type ThemeResponse = Theme;
declare type ThemeResponseSchema = ThemeSchema;

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
  readonly themeRequest: ThemeRequestSchema;
  readonly themeResponse: ThemeResponseSchema;
  readonly browserStorage: BrowserStorageSchema;
}
declare type Schema = SchemaContainer[keyof SchemaContainer];

declare type ValidationError = string | undefined;
