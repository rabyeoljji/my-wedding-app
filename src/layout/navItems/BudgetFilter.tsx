import { useAtom, useAtomValue } from "jotai";
import { isActiveSearchBarAtom } from "../../store/search";
import { filterAtom } from "../../store/filter";
import { MutableRefObject, useEffect, useRef, useState } from "react";

const BudgetFilter = (): JSX.Element => {
  const isActiveSearchBar = useAtomValue(isActiveSearchBarAtom);
  const [filterState, setFilterState] = useAtom(filterAtom);
  const [minCostInput, setMinCostInput] = useState(String(filterState.budget[0] ?? ""));
  const [maxCostInput, setMaxCostInput] = useState(String(filterState.budget[1] ?? ""));

  const minInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const maxInputRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (!isNaN(Number(minCostInput)) && !isNaN(Number(maxCostInput))) {
      setFilterState((filterState) => ({
        ...filterState,
        budget: [Number(minCostInput), Number(maxCostInput)],
      }));
    }
  }, [minCostInput, maxCostInput]);

  const onlyNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.key === "Process") {
      e.preventDefault();
      if (target.classList.contains("minCost")) {
        minInputRef.current.value.replace(/[^0-9]/g, "");
      } else if (target.classList.contains("maxCost")) {
        maxInputRef.current.value.replace(/[^0-9]/g, "");
      }
      alert("숫자만 입력가능합니다");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.classList.contains("minCost")) {
      setMinCostInput(() => target.value);
    } else if (target.classList.contains("maxCost")) {
      setMaxCostInput(() => target.value);
    }
  };

  const resetBudgetFilter = () => {
    setMinCostInput(() => "");
    setMaxCostInput(() => "");
  };

  return (
    <>
      <div className="outSide absolute top-0 left-0 w-screen h-screen z-998"></div>
      <div
        id="filterContainer"
        className={`${!isActiveSearchBar ? "hidden" : "flex"} sm:flex flex-col w-full h-32 absolute z-999 top-20 bg-white border-2 border-solid border-indigo-100 justify-center items-center`}
      >
        <p className="mb-2 font-bold">예산 범위</p>
        <div className="flex items-center">
          <input
            type="number"
            className="minCost w-40 h-8 border-2 border-solid border-gray-200 rounded-lg bg-white indent-2.5"
            placeholder="0"
            ref={minInputRef}
            onKeyUp={(e) => onlyNumber(e)}
            onChange={(e) => handleChange(e)}
            value={minCostInput}
          />
          {`원`}
          <p className="mx-2">~</p>
          <input
            type="number"
            className="maxCost w-40 border-2 border-solid border-gray-200 rounded-lg bg-white indent-2.5"
            placeholder="0"
            ref={maxInputRef}
            onKeyUp={(e) => onlyNumber(e)}
            onChange={(e) => handleChange(e)}
            value={maxCostInput}
          />
          {`원`}
        </div>
        <button
          type="button"
          className="text-xs py-1 px-2 mt-2 bg-indigo-100 rounded-lg"
          onClick={() => resetBudgetFilter()}
        >
          초기화
        </button>
      </div>
    </>
  );
};

export default BudgetFilter;
