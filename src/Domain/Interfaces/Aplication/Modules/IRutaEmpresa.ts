import { MdlBaseResponse } from "../../../Models";
import {
  MdlRutaEmpresa,
  MdlUpdateRuta,
  LIST_ROUTERS_STRUCT,
  ROUTER_STRUCT,
  PARTIAL_POINTS_STRUCT,
  POINTS_XY,
  ROUTER_PROPERTIES_STRUCT,
} from "../../../Models";

export interface IRutaEmpresa {
  SetNewEmpresa: (
    body: IRutaEmpresa.NsEmpresa
  ) => Promise<IRutaEmpresa.NsResponse>;

  GetAllEmpresas: () => Promise<IRutaEmpresa.NsResponse>;

  DeleteEmpresa: (id: string) => Promise<boolean>;

  UpdateRuta: (id: IRutaEmpresa.NsUpRuta) => Promise<boolean>;
  
  ObtRutasRegistro: (
    Nombr: string,
    Color: string,
    Coordenadas: IRutaEmpresa.E_POINTS_XY[]
  ) => Promise<IRutaEmpresa.E_ROUTER_STRUCT>;
}

export namespace IRutaEmpresa {
  export type NsEmpresa = MdlRutaEmpresa;
  export type NsUpRuta = MdlUpdateRuta;
  export type NsResponse = MdlBaseResponse;

  //====================================
  // ESTRUCT
  //====================================

  export type E_LIST_ROUTERS_STRUCT = LIST_ROUTERS_STRUCT;
  export type E_ROUTER_STRUCT = ROUTER_STRUCT;
  export type E_PARTIAL_POINTS_STRUCT = PARTIAL_POINTS_STRUCT;
  export type E_POINTS_XY = POINTS_XY;
  export type E_ROUTER_PROPERTIES_STRUCT = ROUTER_PROPERTIES_STRUCT;
}
