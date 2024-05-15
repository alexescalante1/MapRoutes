import { IRutaEmpresa } from "../../../../Domain/Interfaces";

import {
  SetNewEmpresaFn,
  GetAllEmpresasFn,
  DeleteEmpresaFn,
  UpdateRutaFn,
  ObtRutasRegistroFn,
} from "./Empresas";

export class RutasEmpresaUseCase implements IRutaEmpresa {
  async SetNewEmpresa(
    body: IRutaEmpresa.NsEmpresa
  ): Promise<IRutaEmpresa.NsResponse> {
    return await SetNewEmpresaFn(body);
  }

  async GetAllEmpresas(): Promise<IRutaEmpresa.NsResponse> {
    return await GetAllEmpresasFn();
  }

  async DeleteEmpresa(id: string): Promise<boolean> {
    return await DeleteEmpresaFn(id);
  }
  
  async UpdateRuta(data: IRutaEmpresa.NsUpRuta) : Promise<boolean>{
    return await UpdateRutaFn(data);
  }

  async ObtRutasRegistro(
    Nombr: string,
    Color: string,
    Coordenadas: IRutaEmpresa.E_POINTS_XY[]
  ): Promise<IRutaEmpresa.E_ROUTER_STRUCT> {
    return await ObtRutasRegistroFn(Nombr, Color, Coordenadas);
  }
}
