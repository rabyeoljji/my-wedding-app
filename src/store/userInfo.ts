import { doc, getDoc } from "firebase/firestore";
import { atom } from "jotai";
import { db } from "../firebase";
import { userAuthAtomType, userInfoType } from "../@types/User";
// jotai를 이용한 userInfo 전역 상태관리

// user auth상태
export const initialAuth = {
  uid: "",
  email: "",
};
export const userAuthAtom = atom<userAuthAtomType>(initialAuth);

// user info상태
let initialUserInfo = {
  uid: "",
  nickname: "",
  wishList: [],
  reviews: [],
};
export const userAtom = atom<userInfoType>(initialUserInfo);

// 특정 유저 정보 가져오기
export const fetchUniqueUser = async (collectionName: string, docId: string, type?: string) => {
  const docRef = doc(db, collectionName, docId);
  const docData = await getDoc(docRef);

  if (docData.exists()) {
    return docData.data();
  } else {
    if (type === "login") {
      alert("등록되지 않은 회원입니다");
      console.log("No such document!");
    } else {
      alert("구글 계정으로 회원가입 되었습니다");
    }
    return false;
  }
};
