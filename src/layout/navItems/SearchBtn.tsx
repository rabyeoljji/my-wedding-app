import { useEffect } from "react";
import Search from "./Search";
import { useAtom } from "jotai";
import { isActiveSearchBarAtom } from "../../store/search";

function SearchBtn() {
  const [isActive, setIsActive] = useAtom(isActiveSearchBarAtom);

  useEffect(() => {}, [isActive]);

  const handleClick = () => {
    setIsActive((isActive) => !isActive);
  };

  return (
    <>
      <button
        type="button"
        id="searchBtn"
        className="sm:hidden flex shrink-0 justify-center items-center w-12 h-12 rounded-full bg-white ml-2 mr-4 sm:hover:bg-gray-200"
        onClick={() => handleClick()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="gray"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
      <div
        className={`${!isActive && "hidden"} sm:hidden flex justify-center items-center w-screen h-20 bg-indigo-50 absolute top-28`}
      >
        <Search isMobile={true} />
      </div>
    </>
  );
}

export default SearchBtn;
