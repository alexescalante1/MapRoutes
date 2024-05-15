import { IRutaEmpresa } from "../../../../Domain/Interfaces";
import { FragmentData } from "../../../../Main/Utilities/FragmentStorage/FragmentData";
import { GenFirebaseServiceCls } from "../../../../Infra/Firebase";

export async function SetNewEmpresaFn(
  body: IRutaEmpresa.NsEmpresa
): Promise<IRutaEmpresa.NsResponse> {
  try {
    const PrtInit = new FragmentData(
      process.env.REACT_APP_KPRT ?? ""
    ).GtParttnDtLS(process.env.REACT_APP_CPRT ?? "", "Indt");

    const ObjInit = PrtInit ? JSON.parse(PrtInit) : false;

    await GenFirebaseServiceCls.SetAddDocument(
      process.env.REACT_APP_BASE +
        ObjInit.find((x: any) => x?.data?.id === 1)?.data?.value,
      body
    );

    return {
      success: 1,
      message: "Registro satisfactorio!",
      code: 200,
    };
  } catch (e: any) {
    return {
      success: 0,
      message: "Error desconocido:" + e.message,
      code: 400,
    };
  }
}

export async function GetAllEmpresasFn(): Promise<IRutaEmpresa.NsResponse> {
  try {
    const PrtInit = new FragmentData(
      process.env.REACT_APP_KPRT ?? ""
    ).GtParttnDtLS(process.env.REACT_APP_CPRT ?? "", "Indt");

    const ObjInit = PrtInit ? JSON.parse(PrtInit) : false;

    const objData = await GenFirebaseServiceCls.GetAllDocuments(
      process.env.REACT_APP_BASE +
        ObjInit.find((x: any) => x?.data?.id === 1)?.data?.value
    );

    return {
      success: 1,
      message: "Registro satisfactorio!",
      data: objData.map((item) => ({
        id: item?.id,
        cNombre: item?.data?.cNombre,
        cRucEmpresa: item?.data?.cRucEmpresa,
        cDireccion: item?.data?.cDireccion,
        cTipoEmpresa: item?.data?.cTipoEmpresa,
        cCelular: item?.data?.cCelular,
        lEstado: item?.data?.lEstado,
        arrCoordenada: item?.data?.arrCoordenada,
      })),
      code: 200,
    };
  } catch (e: any) {
    return {
      success: 0,
      message: "Error desconocido:" + e.message,
      code: 400,
    };
  }
}

export async function DeleteEmpresaFn(id: string): Promise<boolean> {
  try {
    const PrtInit = new FragmentData(
      process.env.REACT_APP_KPRT ?? ""
    ).GtParttnDtLS(process.env.REACT_APP_CPRT ?? "", "Indt");

    const ObjInit = PrtInit ? JSON.parse(PrtInit) : false;

    await GenFirebaseServiceCls.SetDeleteDocument(
      process.env.REACT_APP_BASE +
        ObjInit.find((x: any) => x?.data?.id === 1)?.data?.value,
      id
    );

    return true;
  } catch (e: any) {
    return false;
  }
}

export async function UpdateRutaFn(
  data: IRutaEmpresa.NsUpRuta
): Promise<boolean> {
  try {
    const PrtInit = new FragmentData(
      process.env.REACT_APP_KPRT ?? ""
    ).GtParttnDtLS(process.env.REACT_APP_CPRT ?? "", "Indt");

    const ObjInit = PrtInit ? JSON.parse(PrtInit) : false;

    const fieldsToUpdate = {
      arrCoordenada: data?.arrCoordenada,
    };

    await GenFirebaseServiceCls.updateDocumentFields(
      process.env.REACT_APP_BASE +
        ObjInit.find((x: any) => x?.data?.id === 1)?.data?.value,
      data?.id,
      fieldsToUpdate
    );

    return true;
  } catch (e: any) {
    return false;
  }
}

export async function ObtRutasRegistroFn(
  Nombr: string,
  Color: string,
  Coordenadas: IRutaEmpresa.E_POINTS_XY[]
): Promise<IRutaEmpresa.E_ROUTER_STRUCT> {
  let Response: IRutaEmpresa.E_ROUTER_STRUCT;
  Response = {
    Nombre: Nombr,
    Properties: {
      color: Color,
      opacity: 0.3,
      weight: 10,
      stroke: true,
      fillRule: "evenodd",
      bubblingMouseEvents: true,
    },
    GenPoints: Coordenadas,
    PartialPoints: [],
  };

  return await Response;
}
