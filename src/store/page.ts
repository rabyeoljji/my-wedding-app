import { atom } from "jotai";

export const PAGE_COUNT = 5;
export const ALL_DATA_LAST_PAGE_GROUP = 9;

export const INITIAL_PAGE_GROUP = 1;
export const INITIAL_PAGE_LIST = [1, 2, 3, 4, 5];

export const pageListCalc = (PAGE_COUNT: number, pageGroup: number) => {
  let initialPageList = [];
  let lastPage = pageGroup * PAGE_COUNT;
  let firstPage = lastPage - (PAGE_COUNT - 1);
  for (let i = firstPage; i <= lastPage; i++) {
    initialPageList.push(i);
  }

  return initialPageList;
};

export const pageGroupAtom = atom<number>(INITIAL_PAGE_GROUP);
export const pageListAtom = atom<number[]>(pageListCalc(PAGE_COUNT, INITIAL_PAGE_GROUP));
export const currentPageAtom = atom<number>(1);
