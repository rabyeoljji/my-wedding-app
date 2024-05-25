interface userAuthAtomType {
  uid: string;
  email: string;
  authToken?: Promise<string>;
}

interface userInfoType {
  uid: string;
  nickname: string;
  wishList: string[];
  reviews: string[];
}

export type { userAuthAtomType, userInfoType };
