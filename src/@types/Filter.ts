interface filterStateType {
  budget: number[];
  geo: string[];
}

type categoryType = "all" | "place" | "consulting" | "photography" | "flower" | "food";

interface categoryObjectType {
  en: categoryType;
  kr: string;
}

export const categories: categoryObjectType[] = [
  {
    en: "all",
    kr: "전체",
  },
  {
    en: "place",
    kr: "공간",
  },
  {
    en: "consulting",
    kr: "컨설팅",
  },
  {
    en: "photography",
    kr: "사진",
  },
  {
    en: "flower",
    kr: "꽃",
  },
  {
    en: "food",
    kr: "음식",
  },
];

export type { filterStateType, categoryType };
