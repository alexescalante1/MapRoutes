import { MdlBaseResponse } from "../Base/MdlBaseResponse";

export type MdlRutaEmpresa = {
  id: string;
  cNombre: string;
  cRucEmpresa: string;
  cDireccion: string;
  cTipoEmpresa: string;
  cCelular: string;
  arrCoordenada: string;
  lEstado: boolean;
};

export type MdlUpdateRuta = {
  id: string;
  arrCoordenada: string;
};

//=====================================
// ESTRUCTURA DE RUTAS
//=====================================

export type LIST_ROUTERS_STRUCT = {
  IdAutorizacion: string;
  Nombre: string;
  RazonSocial: string;
  ListRutas: ROUTER_STRUCT[];
};

export type ROUTER_STRUCT = {
  Nombre: string;
  Properties: ROUTER_PROPERTIES_STRUCT;
  GenPoints: POINTS_XY[];
  PartialPoints: PARTIAL_POINTS_STRUCT[];
};

export type PARTIAL_POINTS_STRUCT = {
  IdAutorizacion: string;
  Nombre: string;
  Properties: ROUTER_PROPERTIES_STRUCT;
  Points: POINTS_XY[];
};

export type ROUTER_PROPERTIES_STRUCT = {
  color: string;
  opacity: number;
  weight: number;
  stroke: boolean;
  fillRule: string;
  bubblingMouseEvents: boolean;
};


export type POINTS_XY = [POS_X: number, POS_Y: number];
