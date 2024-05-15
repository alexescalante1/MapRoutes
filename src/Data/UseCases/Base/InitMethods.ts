import { IInicializacion } from "../../../Domain/Interfaces";
import { auth } from "./../../../Infra/Firebase/FirebaseCliente";
import { onAuthStateChanged } from "firebase/auth";
import { GenFirebaseServiceCls } from "../../../Infra/Firebase";
import { FragmentData } from "../../../Main/Utilities/FragmentStorage/FragmentData";

export async function InitMethodsFn(): Promise<IInicializacion.NsAuthResponse> {
  let cMessage: string = "No Autenticado.";
  let lSuccess: number = 0;
  let objData: any;

  try {
    //========================================
    // Datos del Cliente
    //========================================

    await new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          objData = currentUser;
          cMessage = "¡Bienvenido!";
          lSuccess = 1;
        } else {
          cMessage = "¡Tiempo Excedido!";
        }
        unsubscribe();
        resolve();
      });
    });

    const usrData = (
      await GenFirebaseServiceCls.GetAllDocuments(objData?.uid ?? "")
    ).find((x) => x?.data?.cTipo === "PersonalData");

    new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
      process.env.REACT_APP_CPRT ?? "",
      "UsrtU",
      JSON.stringify({
        nameG: objData.displayName ?? "",
        email: objData.email ?? "",
        emailVerf: objData.emailVerified ?? "",
        isAnon: objData.isAnonymous ?? "",
        photoURL: objData.photoURL ?? "",
        nombres: usrData?.data?.cNombres ?? "",
        apellidos: usrData?.data?.cApellidos ?? "",
        celular: usrData?.data?.cCelular ?? "",
        direccion: usrData?.data?.cDireccion ?? "",
        doc: usrData?.data?.cDocumento ?? "",
        genero: usrData?.data?.cGenero ?? "",
      })
    );

    new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
      process.env.REACT_APP_CPRT ?? "",
      "Aparienc",
      JSON.stringify({
        perfil: usrData?.data?.cImgPerfil ?? "",
        portada: usrData?.data?.cImgPortada ?? "",
        modoOscuro: usrData?.data?.lModoOscuro ?? "",
      })
    );

    new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
      process.env.REACT_APP_CPRT ?? "",
      "Rcto",
      JSON.stringify({
        id: objData.uid,
        tkn: objData.accessToken,
        rtk: objData.refreshToken,
      })
    );

    //========================================
    // INIT
    //========================================

    const initData = await GenFirebaseServiceCls.GetAllDocuments(
      process.env.REACT_APP_BASE ?? ""
    );

    new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
      process.env.REACT_APP_CPRT ?? "",
      "Indt",
      JSON.stringify(initData)
    );

    new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
      process.env.REACT_APP_CPRT ?? "",
      "IndtApp",
      JSON.stringify(
        (
          await GenFirebaseServiceCls.GetAllDocuments(
            process.env.REACT_APP_BASE +
              initData.find((x) => x?.data?.id === 1)?.data?.value
          )
        ).sort((a, b) => a?.data?.name.localeCompare(b?.data?.name))
      )
    );

    new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
      process.env.REACT_APP_CPRT ?? "",
      "IndtPags",
      JSON.stringify(
        (
          await GenFirebaseServiceCls.GetAllDocuments(
            process.env.REACT_APP_BASE +
              initData.find((x) => x?.data?.id === 2)?.data?.value
          )
        ).sort((a, b) => a?.data?.name.localeCompare(b?.data?.name))
      )
    );

    return {
      success: lSuccess,
      message: cMessage,
      code: 200,
    };
  } catch (e: any) {
    switch (e.code) {
      case "auth/network-request-failed":
        cMessage = "Error de red";
        break;
      case "auth/too-many-requests":
        cMessage = "Demasiadas solicitudes";
        break;
      case "auth/internal-error":
        cMessage = "Error interno de Firebase";
        break;
      default:
        cMessage = "Error desconocido";
        break;
    }

    return {
      success: 0,
      message: cMessage,
      code: 400,
    };
  }
}

export async function InitBaseFn(): Promise<boolean> {
  try {
    const initData = await GenFirebaseServiceCls.GetAllDocuments(
      process.env.REACT_APP_BASE ?? ""
    );

    new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
      process.env.REACT_APP_CPRT ?? "",
      "Indt",
      JSON.stringify(initData)
    );

    return true;
  } catch (e: any) {
    return false;
  }
}
