export type password = {
  symbols: boolean;
  number: boolean;
  length: boolean;
  firstValue: string;
  secondValue: string;
};

export type validation = {
  login: boolean;
  email: boolean;
  firstPassword: boolean;
  secondPassword: boolean;
};

export type check = (
  flag: boolean,
  key: string,
  add?: { [key: string]: boolean }
) => void;

export type checkServer = {
  login: boolean;
  email: boolean;
};