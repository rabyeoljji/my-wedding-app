import { useAtom, useSetAtom } from "jotai";
import { categories, categoryType } from "../@types/Filter";
import { categoryAtom } from "../store/category";
import { useEffect } from "react";
import { currentPageAtom } from "../store/page";

const CategoryBar = (): JSX.Element => {
  const [categoryState, setCategoryState] = useAtom(categoryAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);

  useEffect(() => {}, [categoryState]);

  const addActive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLButtonElement;
    setCategoryState(() => eventTarget.id as categoryType);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="w-full h-auto mt-4 mb-12 sm:mt-0 mb-16 md:mb-8 rounded-lg flex flex-col md:flex-row justify-between items-center overflow-hidden">
        <p className="font-bold text-lg mb-4 md:mb-0 md:mr-4">CATEGORY</p>
        <div className="overflow-x-auto hiddenScroll flex justify-between items-center grow w-full sm:m-0 lg:pr-14 lg:pl-4">
          {categories.map((category) => (
            <div key={category.en} className="shrink-0">
              <button
                type="button"
                id={category.en}
                className={`categoryBtn inline-block px-4 py-2 border-2 border-solid border-indigo-100 rounded-lg mx-1 ${category.en === categoryState && "bg-indigo-100 active"}`}
                onClick={(e) => addActive(e)}
              >
                {category.kr}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryBar;
