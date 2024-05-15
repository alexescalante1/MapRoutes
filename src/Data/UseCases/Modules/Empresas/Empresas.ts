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
        cDireccion: item?.data?.cDireccion,
        cTipoEmpresa: item?.data?.cTipoEmpresa,
        cCelular: item?.data?.cCelular,
        lEstado: item?.data?.lEstado,
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

export async function DeleteEmpresaFn(id: string): Promise<string> {
  const fireRel = await GenFirebaseServiceCls.GetAllFillDocuments(
    "RelNodos",
    "NodoOrigen",
    "==",
    id
  );

  await GenFirebaseServiceCls.SetDeleteDocument("Nodos", id);
  return Math.random().toString();
}
