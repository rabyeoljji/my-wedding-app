import { ReviewType } from "./Review";

interface AddressType {
  city: string;
  county: string;
  detail_address: string;
}

interface BusinessItemType {
  id: string;
  category: string;
  name: string;
  address: AddressType;
  contact: string;
  homepage: string;
  min_cost: number | null;
  max_cost: number | null;
  possible_amount?: number;
  reviews: ReviewType["id"][];
  image: string | null;
  key_words?: string;
}

interface BusinessPropsType {
  type: "main" | "wishList";
}

export type { AddressType, BusinessItemType, BusinessPropsType };
