import placeImg from "../assets/image/wedding_place.jpg";
import consultingImg from "../assets/image/wedding_consulting.jpg";
import photographyImg from "../assets/image/wedding_photo.jpg";
import flowerImg from "../assets/image/wedding_flower.jpg";
import foodImg from "../assets/image/wedding_food.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SliderItemType {
  readonly category: string;
  readonly img: string;
}
const Slider = (): JSX.Element => {
  const items = [
    {
      category: "place",
      img: placeImg,
    },
    {
      category: "consulting",
      img: consultingImg,
    },
    {
      category: "photography",
      img: photographyImg,
    },
    {
      category: "flower",
      img: flowerImg,
    },
    {
      category: "food",
      img: foodImg,
    },
  ];
  const [carouselState, setCarouselState] = useState({ current: 0, next: 1 });

  useEffect(() => {
    setTimeout(handleState, 3500);
  }, [carouselState]);

  const handleState = () => {
    if (carouselState.current === items.length - 1) {
      setCarouselState(() => ({ current: 0, next: 1 }));
    } else if (carouselState.next === items.length - 1) {
      setCarouselState((state) => ({ current: state.current + 1, next: 0 }));
    } else {
      setCarouselState(({ current, next }) => ({ current: current + 1, next: next + 1 }));
    }
  };

  return (
    <div className="carouselContainer hidden lg:inline-block lg:w-60 lg:h-[45rem] mr-2 rounded-lg overflow-hidden absolute right-[5%] xl:right-[10%]">
      {items.map((item: SliderItemType, index) => (
        <img
          key={item.category}
          src={item.img}
          alt={item.category}
          id={`carouselItem-${index}`}
          className={`carouselItem lg:w-60 lg:h-[45rem] absolute top-0 left-0 transition-all duration-300 ${index === carouselState.current && "active z-20"} ${index === carouselState.next && "next translate-x-60"} ${index === carouselState.current - 1 && "z-10"}`}
        />
      ))}
    </div>
  );
};

export default Slider;
