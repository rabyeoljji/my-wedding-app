import { atom } from "jotai";
import { DocumentData } from "firebase/firestore";

export const reviewListAtom = atom<DocumentData[]>([]);
export const renderReviewListAtom = atom<string[]>([]);
