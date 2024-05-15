import { IRutaEmpresa } from "../../../../Domain/Interfaces";

import { SetNewEmpresaFn, GetAllEmpresasFn, DeleteEmpresaFn } from "./Empresas";

export class RutasEmpresaUseCase implements IRutaEmpresa {
  async SetNewEmpresa(body: IRutaEmpresa.NsEmpresa): Promise<IRutaEmpresa.NsResponse> {
    return await SetNewEmpresaFn(body);
  }

  async GetAllEmpresas(): Promise<IRutaEmpresa.NsResponse> {
    return await GetAllEmpresasFn();
  }

  async DeleteEmpresa(id: string): Promise<boolean> {
    return await DeleteEmpresaFn(id);
  }
}
