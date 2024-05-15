import { MdlBaseResponse } from "../../../Models";
import { MdlEmpresa } from "../../../Models";

export interface IRutaEmpresa {
  SetNewEmpresa: (body: IRutaEmpresa.NsEmpresa) => Promise<IRutaEmpresa.NsResponse>;

  GetAllEmpresas: () => Promise<IRutaEmpresa.NsResponse>;

  DeleteNode: (id: string) => Promise<string>;
}

export namespace IRutaEmpresa {
  export type NsEmpresa = MdlEmpresa;
  export type NsResponse = MdlBaseResponse;
}
