import { IInicializacion } from "../../../Domain/Interfaces";
import { auth } from "./../../../Infra/Firebase/FirebaseCliente";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { GenFirebaseServiceCls } from "../../../Infra/Firebase";
import { FragmentData } from "../../../Main/Utilities/FragmentStorage/FragmentData";

export async function GetRegisterAuthFn(
  body: IInicializacion.NsAuthRequest
): Promise<IInicializacion.NsAuthResponse> {
  let cMessage: string = "Registro satisfactorio!";
  let objData: any;

  try {
    objData = await createUserWithEmailAndPassword(
      auth,
      body.cEmail,
      body.cPassword
    );

    await GenFirebaseServiceCls.SetAddDocument(objData.user.uid, {
      cTipo: "PersonalData",
      cDocumento: body.cDocumento,
      cNombres: body.cNombres,
      cApellidos: body.cApellidos,
      cCelular: body.cCelular,
      cDireccion: body.cDireccion,
      cGenero: body.cGenero,
      lModoOscuro: false,
      cImgPerfil: "",
      cImgPortada: "",
    });
    
    return {
      success: 1,
      message: cMessage,
      data: objData,
      code: 200,
    };
  } catch (e: any) {
    switch (e.code) {
      case "auth/email-already-in-use":
        cMessage =
          "El correo electrónico ya está en uso. Por favor, intenta con otro.";
        break;
      case "auth/weak-password":
        cMessage = "La contraseña es débil. Debe tener al menos 6 caracteres.";
        break;
      case "auth/invalid-email":
        cMessage = "El correo electrónico proporcionado no es válido.";
        break;
      default:
        cMessage = "Error desconocido al crear usuario";
        break;
    }

    return {
      success: 0,
      message: cMessage,
      code: 400,
    };
  }
}

export async function LoginAuthFn(
  body: IInicializacion.NsAuthRequest
): Promise<IInicializacion.NsAuthResponse> {
  let cMessage: string = "¡Bienvenido!!!";

  try {
    await signInWithEmailAndPassword(auth, body.cEmail, body.cPassword);

    new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
      process.env.REACT_APP_CPRT ?? "",
      "CrptU",
      JSON.stringify({
        lVal: true,
      })
    );

    return {
      success: 1,
      message: cMessage,
      code: 200,
    };
  } catch (e: any) {
    switch (e.code) {
      case "auth/user-not-found":
        cMessage = "Usuario no encontrado. Verifica tus credenciales.";
        break;
      case "auth/invalid-login-credentials":
        cMessage = "Credenciales Invalidas.";
        break;
      case "auth/wrong-password":
        cMessage = "Contraseña incorrecta. Inténtalo de nuevo.";
        break;
      case "auth/invalid-email":
        cMessage = "Correo electrónico inválido. Ingresa un correo válido.";
        break;
      case "auth/too-many-requests":
        cMessage =
          "Demasiados intentos fallidos. Por favor, intenta nuevamente más tarde.";
        break;
      default:
        cMessage = "Error desconocido";
        break;
    }

    new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
      process.env.REACT_APP_CPRT ?? "",
      "CrptU",
      JSON.stringify({
        lVal: false,
      })
    );

    return {
      success: 0,
      message: cMessage,
      code: 400,
    };
  }
}

export async function LoginWithGoogleAuthFn(): Promise<IInicializacion.NsAuthResponse> {
  const googleProvider = new GoogleAuthProvider();
  let cMessage: string = "¡Bienvenido!!!";
  let objData: any;

  try {
    objData = await signInWithPopup(auth, googleProvider);

    new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
      process.env.REACT_APP_CPRT ?? "",
      "CrptU",
      JSON.stringify({
        lVal: true,
      })
    );

    return {
      success: 1,
      message: cMessage,
      data: objData,
      code: 200,
    };
  } catch (e: any) {
    switch (e.code) {
      case "auth/user-not-found":
        cMessage = "Usuario no encontrado. Verifica tus credenciales.";
        break;
      case "auth/invalid-login-credentials":
        cMessage = "Credenciales Invalidas.";
        break;
      case "auth/wrong-password":
        cMessage = "Contraseña incorrecta. Inténtalo de nuevo.";
        break;
      case "auth/invalid-email":
        cMessage = "Correo electrónico inválido. Ingresa un correo válido.";
        break;
      case "auth/too-many-requests":
        cMessage =
          "Demasiados intentos fallidos. Por favor, intenta nuevamente más tarde.";
        break;
      default:
        cMessage = "Error desconocido";
        break;
    }

    new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
      process.env.REACT_APP_CPRT ?? "",
      "CrptU",
      JSON.stringify({
        lVal: false,
      })
    );

    return {
      success: 0,
      message: cMessage,
      code: 400,
    };
  }
}

export async function ResetPassFn(
  body: IInicializacion.NsAuthRequest
): Promise<IInicializacion.NsAuthResponse> {
  let cMessage: string =
    "Se ha enviado un enlace para que resetees tu contraseña.";

  try {
    await sendPasswordResetEmail(auth, body.cEmail);

    return {
      success: 1,
      message: cMessage,
      code: 200,
    };
  } catch (e: any) {
    switch (e.code) {
      case "auth/user-not-found":
        cMessage = "Usuario no encontrado. Verifica tus credenciales.";
        break;
      case "auth/invalid-login-credentials":
        cMessage = "Credenciales Invalidas.";
        break;
      case "auth/wrong-password":
        cMessage = "Contraseña incorrecta. Inténtalo de nuevo.";
        break;
      case "auth/invalid-email":
        cMessage = "Correo electrónico inválido. Ingresa un correo válido.";
        break;
      case "auth/too-many-requests":
        cMessage =
          "Demasiados intentos fallidos. Por favor, intenta nuevamente más tarde.";
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

export async function GetStateAuthFn(): Promise<IInicializacion.NsAuthResponse> {
  let cMessage: string = "No Autenticado.";
  let lSuccess: number = 0;
  let objData: any;

  try {
    await new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        objData = currentUser;
        if (currentUser) {
          cMessage = "¡Bienvenido!";
          lSuccess = 1;
        } else {
          cMessage = "¡Tiempo Excedido!";
        }
        unsubscribe();
        resolve();
      });
    });

    console.log(objData);

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

export async function LogoutFn(): Promise<IInicializacion.NsAuthResponse> {
  let cMessage: string = "Logout satisfactorio!";

  new FragmentData(process.env.REACT_APP_KPRT ?? "").StParttnDtLS(
    process.env.REACT_APP_CPRT ?? "",
    "CrptU",
    JSON.stringify({
      lVal: false,
    })
  );

  try {
    await signOut(auth);

    return {
      success: 1,
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
