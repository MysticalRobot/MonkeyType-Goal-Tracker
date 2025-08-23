declare type Primitive =
  | 'undefined'
  | 'object'
  | 'boolean'
  | 'number'
  | 'bigint'
  | 'string'
  | 'symbol'
  | 'function';
declare interface UpdateIconRequest {
  readonly action: 'updateIcon';
  readonly iconDataURI: string;
}
declare interface UpdateIconResponse {
  readonly success: boolean;
  readonly message: string;
}
declare interface IconDataURIRequest {
  readonly action: 'sendIconDataURI';
}
declare interface IconDataURIResponse {
  readonly iconDataURI: string;
}
declare type StorageEntry = { iconDataURI: string };
declare type StorageKey = keyof StorageEntry;
declare type ValidationResult = string | undefined;
