import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import "firebase/firestore";
import firebaseConfig from "../../Main/Config/FirebaseConfig";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
