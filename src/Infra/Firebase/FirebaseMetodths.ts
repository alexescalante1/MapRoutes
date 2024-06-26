import { db, storage } from "./FirebaseCliente";
import {
  collection,
  collectionGroup,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import {
  IFirebaseService,
  IDocumentData,
} from "../../Domain/Interfaces/Protocols";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const GenFirebaseServiceCls: IFirebaseService = {
  async GetDocumentById(
    cCollection: string,
    id: string
  ): Promise<IDocumentData | null> {
    try {
      const resData = await getDoc(doc(db, cCollection, id));
      if (resData.exists()) {
        return { id: resData.id, data: resData.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al buscar el documento por ID:", error);
      return null;
    }
  },

  async GetAllDocuments(cCollection: string): Promise<IDocumentData[]> {
    try {
      const docData = await getDocs(query(collectionGroup(db, cCollection)));
      return docData.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
    } catch (error) {
      console.error("Error al buscar el documento:", error);
      return [];
    }
  },

  async GetAllFillDocuments(
    cCollection: string,
    fieldPath: string,
    opStr: any,
    value: any
  ): Promise<IDocumentData[]> {
    try {
      const docData = await getDocs(
        query(collection(db, cCollection), where(fieldPath, opStr, value))
      );
      return docData.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
    } catch (error) {
      console.error("Error al buscar el documento:", error);
      return [];
    }
  },

  async SetAddDocument(cCollection: string, data: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, cCollection), data);
      return docRef.id;
    } catch (error) {
      console.error("Error al insertar el documento:", error);
      return "";
    }
  },

  async updateDocumentFields(
    cCollection: string,
    docId: string,
    fieldsToUpdate: Record<string, any>
  ): Promise<void> {
    try {
      const docRef = doc(db, cCollection, docId);
      await updateDoc(docRef, fieldsToUpdate);
    } catch (error) {
      console.error("Error al actualizar los campos:", error);
    }
  },

  async SetUpdateDocument(
    cCollection: string,
    id: string,
    data: any
  ): Promise<void> {
    try {
      await updateDoc(doc(db, cCollection, id), data);
    } catch (error) {
      console.error("Error al Actualizar el documento:", error);
    }
  },

  async SetDeleteDocument(cCollection: string, id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, cCollection, id));
    } catch (error) {
      console.error("Error al Eliminar el documento:", error);
    }
  },

  //=================================
  // STORAGE
  //=================================

  async UploadFileBlob(
    file: any,
    route: string,
    name: string | null
  ): Promise<string> {
    try {
      const { v4: uuidv4 } = require("uuid");
      const storageRef = ref(storage, route + (name ? name : uuidv4()));
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error al Eliminar el documento:", error);
    }
    return "error";
  },
};
