import { MdlAuthRequest, MdlBaseResponse } from "../../../Models";

export interface IInicializacion {
  SetUserAuth: (
    body: IInicializacion.NsAuthRequest
  ) => Promise<IInicializacion.NsAuthResponse>;

  LoginAuth: (
    body: IInicializacion.NsAuthRequest
  ) => Promise<IInicializacion.NsAuthResponse>;

  LoginGoogleAuth: () => Promise<IInicializacion.NsAuthResponse>;

  ResetPass: (
    body: IInicializacion.NsAuthRequest
  ) => Promise<IInicializacion.NsAuthResponse>;

  OnStateAuth: () => Promise<IInicializacion.NsAuthResponse>;

  OnLogoutAuth: () => Promise<IInicializacion.NsAuthResponse>;

  GetInitConfig: () => Promise<IInicializacion.NsAuthResponse>;

  GetInitBase: () => Promise<boolean>;
}

export namespace IInicializacion {
  export type NsAuthResponse = MdlBaseResponse;
  export type NsAuthRequest = MdlAuthRequest;
  export type NsInitConfigResponse = boolean;
}
