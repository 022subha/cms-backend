export type IRegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ILoginBody = {
  username: string;
  password: string;
};

export type ICreateActivationTokenResponseBody = {
  token: string;
  otp: string;
};

export type IActivationMailBody = {
  name: string;
  otp: string;
};
