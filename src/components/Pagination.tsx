import { useAtom, useAtomValue } from "jotai";
import { PAGE_COUNT, currentPageAtom, pageGroupAtom, pageListAtom, pageListCalc } from "../store/page";
import { useEffect } from "react";
import { filteredListAtom } from "../store/company";

const Pagination = ({ type, list }: { type: "main" | "review"; list?: string[] }): JSX.Element => {
  const [pageGroup, setPageGroup] = useAtom(pageGroupAtom);
  const [pageList, setPageList] = useAtom(pageListAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const filteredList = useAtomValue(filteredListAtom);
  const totalPage =
    type === "main" ? Math.ceil(filteredList.length / PAGE_COUNT) : Math.ceil((list?.length ?? 1) / PAGE_COUNT);
  const lastPageGroup = Math.ceil(totalPage / PAGE_COUNT);
  // const lastPageGroup = 9; // dataList길이에 따라 달라져야 함
  // dataList length === 216
  // totalPage = Math.ceil(dataList length / PAGE_COUNT)
  // lastPageGroup = Math.ceil(totalPage / PAGE_COUNT)

  useEffect(() => {
    let newPageList = [];
    if (totalPage < PAGE_COUNT) {
      newPageList = pageListCalc(totalPage, pageGroup);
    } else {
      newPageList = pageListCalc(PAGE_COUNT, pageGroup);
    }
    setPageList(newPageList);
  }, [pageGroup, totalPage, setPageList]);

  // 페이지 클릭 시 동작
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const targetBtn = e.target as HTMLButtonElement;

    if (targetBtn.classList.contains("prev")) {
      if (pageGroup === 1) return;
      else {
        setPageGroup(pageGroup - 1);
        setCurrentPage(() => pageList[0] - 1);
      }
    } else if (targetBtn.classList.contains("next")) {
      if (pageGroup === lastPageGroup || currentPage === totalPage) return;
      else {
        setPageGroup(pageGroup + 1);
        setCurrentPage(() => pageList[pageList.length - 1] + 1);
      }
    } else {
      if (Number(targetBtn.innerText) > totalPage) return;
      else setCurrentPage(() => Number(targetBtn.innerText));
    }
  };

  return (
    <div className={`pagination mb-16 ${type === "review" && "mt-8"}`}>
      <div className="join">
        <button className="join-item btn btn-sm bg-indigo-200 prev" onClick={(e) => handleClick(e)}>{`<`}</button>
        {pageList.map((page) => (
          <button
            key={page}
            className={`join-item btn btn-sm bg-indigo-100 hover:bg-indigo-200 ${page === currentPage && "bg-indigo-300 active"}`}
            onClick={(e) => handleClick(e)}
          >
            {page}
          </button>
        ))}
        <button className="join-item btn btn-sm bg-indigo-200 next" onClick={(e) => handleClick(e)}>{`>`}</button>
      </div>
    </div>
  );
};

export default Pagination;
