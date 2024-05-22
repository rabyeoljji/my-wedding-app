import { DocumentData } from "firebase/firestore";
import { atom } from "jotai";

// TODO
// isWishList?: userInfoType["wishList"],

export const businessAtom = atom<DocumentData[]>([]);
export const filteredListAtom = atom<DocumentData[]>([]);
export const renderingListAtom = atom<DocumentData[]>([]);
