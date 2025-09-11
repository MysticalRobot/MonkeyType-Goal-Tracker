declare type Primitive =
  | 'undefined'
  | 'object'
  | 'boolean'
  | 'number'
  | 'bigint'
  | 'string'
  | 'symbol'
  | 'function';
declare interface Theme {
  readonly mainColor: string;
  readonly bgColor: string;
}
declare interface UpdateIconRequest {
  readonly action: 'updateIcon';
  readonly theme: Theme;
}
declare interface UpdateIconResponse {
  readonly success: boolean;
  readonly message: string;
}
declare interface ThemeRequest {
  readonly action: 'sendTheme';
}
declare interface ThemeResponse {
  readonly theme: Theme;
}
declare interface Storage {
  iconDataURI: string;
  theme: Theme;
}
declare type StorageKey = keyof Storage;
declare type ValidationError = string | undefined;
