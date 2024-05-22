import { DocumentData } from "firebase/firestore";

interface userAuthAtomType {
  uid: string;
  email: string;
  authToken?: Promise<string>;
}

interface userInfoType {
  uid: string;
  nickname: string;
  wishList: string[];
  reviews: DocumentData[];
}

export type { userAuthAtomType, userInfoType };
