// import { Carousel } from "react-responsive-carousel";
import placeImg from "../assets/image/wedding_place.jpg";
// import consultingImg from "../assets/image/wedding_consulting.jpg";
// import photographyImg from "../assets/image/wedding_photo.jpg";
// import flowerImg from "../assets/image/wedding_flower.jpg";
// import foodImg from "../assets/image/wedding_food.jpg";

const Slider = (): JSX.Element => {
  // const items = [
  //   {
  //     category: "place",
  //     img: placeImg,
  //   },
  //   {
  //     category: "consulting",
  //     img: consultingImg,
  //   },
  //   {
  //     category: "photography",
  //     img: photographyImg,
  //   },
  //   {
  //     category: "flower",
  //     img: flowerImg,
  //   },
  //   {
  //     category: "food",
  //     img: foodImg,
  //   },
  // ];
  // interface SliderItemType {
  //   readonly category: string;
  //   readonly img: string;
  // }

  return (
    <div className="hidden lg:inline-block mr-2">
      <img src={placeImg} alt="place" className="rounded-lg xl:w-60 xl:h-[45rem]" />
    </div>
  );
};

export default Slider;
