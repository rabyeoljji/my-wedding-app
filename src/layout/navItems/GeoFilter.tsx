import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { filterAtom } from "../../store/filter";
import { isActiveSearchBarAtom } from "../../store/search";
import { useEffect, useState } from "react";
import { geoMap } from "../../store/geoMap";
import { currentPageAtom, pageGroupAtom } from "../../store/page";

const GeoFilter = (): JSX.Element => {
  const isActiveSearchBar = useAtomValue(isActiveSearchBarAtom);
  const setPageGroup = useSetAtom(pageGroupAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);
  const [filterState, setFilterState] = useAtom(filterAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownCategory, setDropDownCategory] = useState("");

  useEffect(() => {
    window.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;
      if (target?.classList.contains("selectCity") || target?.classList.contains("selectCounty")) return;
      else {
        setIsOpen(() => false);
      }
    });
  }, []);

  const handleDropDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const target = e.target as HTMLButtonElement;
    if (target.classList.contains("selectCity")) {
      setDropDownCategory(() => "city");
      setIsOpen(() => true);
    } else if (target.classList.contains("selectCounty")) {
      setDropDownCategory(() => "county");
      setIsOpen(() => true);
    }
  };

  const selectGeo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;

    if (target.classList.contains("header")) return;

    if (dropDownCategory === "city") {
      setFilterState((filterState) => ({
        ...filterState,
        geo: [target.innerText, "전체"],
      }));
      setPageGroup(() => 1);
      setCurrentPage(() => 1);
      setIsOpen(() => false);
    } else if (dropDownCategory === "county") {
      setFilterState((filterState) => ({
        ...filterState,
        geo: [filterState.geo[0], target.innerText],
      }));
      setPageGroup(() => 1);
      setCurrentPage(() => 1);
      setIsOpen(() => false);
    }
  };

  return (
    <>
      <div className="outSide absolute top-0 left-0 w-screen h-screen"></div>
      <div
        id="filterContainer"
        className={`${!isActiveSearchBar ? "hidden" : "flex"} sm:flex flex-col w-full h-32 absolute top-20 bg-white border-2 border-solid border-indigo-100 justify-center items-center`}
      >
        <p className="mb-2 font-bold">찾는 지역</p>
        <div className="flex justify-center items-center w-full">
          <button
            className="selectCity w-28 h-8 border-2 border-solid border-gray-200 rounded-lg bg-white flex justify-center items-center mx-4"
            onClick={(e) => handleDropDown(e)}
          >
            {filterState.geo[0]}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#c0c0c0"
              className="selectCity bi bi-caret-down-fill ml-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                className="selectCity"
              />
            </svg>
          </button>
          <button
            className="selectCounty w-28 h-8 border-2 border-solid border-gray-200 rounded-lg bg-white flex justify-center items-center mx-4"
            onClick={(e) => handleDropDown(e)}
          >
            {filterState.geo[1]}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#c0c0c0"
              className="selectCounty bi bi-caret-down-fill ml-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                className="selectCounty"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`border-2 border-solid border-gray-200 rounded-lg bg-white ${!isOpen && "-translate-y-64 opacity-0 -z-50"} absolute inset-x-auto top-48 w-56 max-h-52 z-30 overflow-y-scroll transition-all duration-300`}
        onClick={(e) => selectGeo(e)}
      >
        <div className="header h-8 flex justify-center items-center border-b-2 border-solid border-gray-200 bg-gray-100 sticky top-0">
          {dropDownCategory === "city" ? "시/도" : "시/군/구"}
        </div>
        {dropDownCategory === "city"
          ? Object.keys(geoMap).map((city, index) => {
              return (
                <div
                  key={index}
                  className="h-8 flex justify-center items-center border-b-2 border-solid border-gray-200 cursor-pointer"
                >
                  {city}
                </div>
              );
            })
          : geoMap[`${filterState.geo[0]}`].map((county, index) => {
              return (
                <div
                  key={index}
                  className="h-8 flex justify-center items-center border-b-2 border-solid border-gray-200 cursor-pointer"
                >
                  {county}
                </div>
              );
            })}
      </div>
    </>
  );
};

export default GeoFilter;
