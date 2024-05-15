import { IRutaEmpresa } from "../../../../Domain/Interfaces";

import { SetNewEmpresaFn, GetAllEmpresasFn } from "./Empresas";

export class RutasEmpresaUseCase implements IRutaEmpresa {
  async SetNewEmpresa(body: IRutaEmpresa.NsEmpresa): Promise<IRutaEmpresa.NsResponse> {
    return await SetNewEmpresaFn(body);
  }

  async GetAllEmpresas(): Promise<IRutaEmpresa.NsResponse> {
    return await GetAllEmpresasFn();
  }

  async DeleteNode(id: string): Promise<string> {
    return "true"; //await DeleteNodeFn(id);
  }
}
