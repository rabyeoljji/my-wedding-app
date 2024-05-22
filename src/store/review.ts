import { atom } from "jotai";
import { ReviewType } from "../@types/Review";

export const reviewListAtom = atom<ReviewType[]>([]);
