import { atom } from "jotai";
import { filterStateType } from "../@types/Filter";
import { DocumentData } from "firebase/firestore";

// 검색 필터
export const initialFilter = {
  budget: [null, null],
  geo: ["전체", "전체"],
};
export const filterAtom = atom<filterStateType>(initialFilter);

export const activeGeoFilter = (businessList: DocumentData[], filterState: filterStateType) => {
  const city = filterState.geo[0];
  const county = filterState.geo[1];

  if (city === "전체") {
    return businessList;
  } else {
    if (county === "전체") {
      return businessList.filter((data) => data.address.city === city);
    } else {
      return businessList.filter((data) => data.address.city === city && data.address.county === county);
    }
  }
};

export const activeBudgetFilter = (businessList: DocumentData[], filterState: filterStateType) => {
  const minCost = filterState.budget[0] ?? 0;
  const maxCost = filterState.budget[1] ?? 0;

  if ((minCost === 0 && maxCost === 0) || maxCost === 0 || maxCost <= minCost) {
    return businessList;
  } else {
    return businessList.filter(
      (data) =>
        (minCost <= data.min_cost && data.min_cost <= maxCost) ||
        (minCost <= data.max_cost && data.max_cost <= maxCost) ||
        (!data.min_cost && !data.max_cost),
    );
  }
};
