import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import BudgetFilter from "./BudgetFilter";
import GeoFilter from "./GeoFilter";
import { filterAtom } from "../../store/filter";
import { filterStateType } from "../../@types/Filter";
import { searchKeywordAtom } from "../../store/search";

function Search({ isMobile }: { isMobile: boolean }) {
  const filterState = useAtomValue(filterAtom);
  const setSearchKeyword = useSetAtom(searchKeywordAtom);
  const [openBudget, setOpenBudget] = useState(false);
  const [openGeo, setOpenGeo] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;
      if (target.classList.contains("outSide")) {
        setOpenGeo(() => false);
        setOpenBudget(() => false);
      }
    });
  }, []);

  useEffect(() => {}, [openGeo, openBudget]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setSearchKeyword(() => target.value.toLowerCase());
  };

  const handleFilterBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const target = e.target as HTMLButtonElement;

    if (target.classList.contains("budgetFilter")) {
      setOpenBudget((openBudget) => !openBudget);
      setOpenGeo(() => false);
    } else {
      setOpenGeo((openGeo) => !openGeo);
      setOpenBudget(() => false);
    }
  };

  const isFilterActive = (category: string, filterState: filterStateType) => {
    if (category === "geo") {
      return filterState.geo[0] !== "전체" || filterState.geo[1] !== "전체";
    } else if (category === "budget") {
      return (
        (filterState.budget[0] !== null && filterState.budget[0] !== 0) ||
        (filterState.budget[1] !== null && filterState.budget[1] !== 0)
      );
    }
  };

  return (
    <>
      <form className={`${!isMobile ? "hidden w-1/2 sm:flex" : "w-full flex"} justify-center items-center`}>
        <input
          type="text"
          aria-label="검색창"
          className={`${!isMobile ? "hidden w-4/5" : "w-3/5 ml-4"} sm:inline-block min-w-36 h-12 rounded-xl indent-2.5`}
          onChange={(e) => handleSearchChange(e)}
        ></input>
        <button
          type="button"
          aria-label="지역 설정 버튼"
          className={`geoFilter ${!isMobile ? "hidden sm:flex" : "flex"} shrink-0 justify-center items-center w-12 h-12 rounded-full bg-white ml-2 hover:bg-gray-200 transition-all ${isFilterActive("geo", filterState) && "border-2 border-solid border-indigo-300"}`}
          onClick={(e) => handleFilterBtn(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="gray"
            className="geoFilter bi bi-geo-alt"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"
              className="geoFilter"
            />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="예산 설정 버튼"
          className={`budgetFilter ${!isMobile ? "hidden sm:flex" : "flex"} shrink-0 justify-center items-center w-12 h-12 rounded-full bg-white ml-2 mr-2 hover:bg-gray-200 transition-all ${isFilterActive("budget", filterState) && "border-2 border-solid border-indigo-300"}`}
          onClick={(e) => handleFilterBtn(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="gray"
            className="budgetFilter bi bi-currency-dollar"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"
              className="budgetFilter"
            />
          </svg>
        </button>
      </form>
      {openBudget && <BudgetFilter />}
      {openGeo && <GeoFilter />}
    </>
  );
}

export default Search;
