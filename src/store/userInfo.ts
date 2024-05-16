import { doc, getDoc } from "firebase/firestore";
import { atom } from "jotai";
import { db } from "../firebase";
// jotai를 이용한 userInfo 전역 상태관리

// user auth상태
export interface userAuthAtomType {
  uid: string;
  email: string;
  authToken?: Promise<string>;
}
export const initialAuth = {
  uid: "",
  email: "",
};
export const userAuthAtom = atom<userAuthAtomType>(initialAuth);

// user info상태
export interface userInfoType {
  uid: string;
  nickname: string;
  wishList: string[];
  reviews: string[];
}
let initialUserInfo = {
  uid: "",
  nickname: "",
  wishList: [],
  reviews: [],
};
export const userAtom = atom<userInfoType>(initialUserInfo);

// 특정 doc 가져오기
export const fetchUniqueData = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docData = await getDoc(docRef);

  if (docData.exists()) {
    return docData.data();
  } else {
    console.log("No such document!");
    return;
  }
};

export const fetchAllData = async (collectionName: string) => {};
