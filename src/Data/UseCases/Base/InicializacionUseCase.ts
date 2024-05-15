import { IInicializacion } from "../../../Domain/Interfaces";
import {
  GetRegisterAuthFn,
  LoginAuthFn,
  GetStateAuthFn,
  LogoutFn,
  LoginWithGoogleAuthFn,
  ResetPassFn,
} from "./AuthMethods";
import { InitMethodsFn, InitBaseFn } from "./InitMethods";

export class InicializacionUseCase implements IInicializacion {
  async SetUserAuth(
    body: IInicializacion.NsAuthRequest
  ): Promise<IInicializacion.NsAuthResponse> {
    return await GetRegisterAuthFn(body);
  }

  async LoginAuth(
    body: IInicializacion.NsAuthRequest
  ): Promise<IInicializacion.NsAuthResponse> {
    return await LoginAuthFn(body);
  }

  async LoginGoogleAuth(): Promise<IInicializacion.NsAuthResponse> {
    return await LoginWithGoogleAuthFn();
  }

  async ResetPass(
    body: IInicializacion.NsAuthRequest
  ): Promise<IInicializacion.NsAuthResponse> {
    return await ResetPassFn(body);
  }

  async OnStateAuth(): Promise<IInicializacion.NsAuthResponse> {
    return await GetStateAuthFn();
  }

  async OnLogoutAuth(): Promise<IInicializacion.NsAuthResponse> {
    return await LogoutFn();
  }

  async GetInitConfig(): Promise<IInicializacion.NsAuthResponse> {
    return await InitMethodsFn();
  }

  async GetInitBase(): Promise<boolean> {
    return await InitBaseFn();
  }
}
