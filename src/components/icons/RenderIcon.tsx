import { categoryType } from "../../@types/Filter";
import PlaceIcon from "./PlaceIcon";
import ConsultingIcon from "./ConsultingIcon";
import PhotographyIcon from "./PhotographyIcon";
import FlowerIcon from "./FlowerIcon";
import FoodIcon from "./FoodIcon";

const iconMap = {
  all: null,
  place: PlaceIcon,
  consulting: ConsultingIcon,
  photography: PhotographyIcon,
  flower: FlowerIcon,
  food: FoodIcon,
};

export const RenderIcon = ({ category }: { category: categoryType }): JSX.Element => {
  const IconComponent = iconMap[category];
  return IconComponent ? <IconComponent /> : <></>;
};
