import { atom } from "jotai";
import { categoryType } from "../@types/Filter";
import { DocumentData } from "firebase-admin/firestore";

// 카테고리
export const initialCategory = "all";
export const categoryAtom = atom<categoryType>(initialCategory);

export const filterCategory = (businessList: DocumentData[], category: categoryType) => {
  const filteredList = businessList.filter((businessItem) => businessItem.category === category);

  return filteredList;
};
