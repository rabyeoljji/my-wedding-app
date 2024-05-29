import { atom } from "jotai";

export const isActiveSearchBarAtom = atom<boolean>(false);
export const searchKeywordAtom = atom<string>("");
