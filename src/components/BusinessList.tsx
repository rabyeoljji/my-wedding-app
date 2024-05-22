import { useEffect, useMemo, useState } from "react";
import { BusinessPropsType } from "../@types/Business";
import HeartIcon from "./icons/HeartIcon";
import { useAtom, useAtomValue } from "jotai";
import { businessAtom, filteredListAtom, renderingListAtom } from "../store/company";
import { Link } from "react-router-dom";
import { activeBudgetFilter, activeGeoFilter, filterAtom } from "../store/filter";
import { filterCategory } from "../store/category";
import { categoryAtom } from "../store/category";
import { currentPageAtom } from "../store/page";
import { userAtom } from "../store/userInfo";
import { RenderIcon } from "./icons/RenderIcon";
import BusinessListSkeleton from "../skeleton/BusinessListSkeleton";

const BusinessList = ({ type }: BusinessPropsType): JSX.Element => {
  // businessList 상태에 데이터 배열 저장되어있음
  // type이 main이면 filtered리스트를, wishList이면 user의 wish_list에 있는 id해당 리스트를 렌더링

  // 전체 데이터 불러와서 메모
  const filterState = useAtomValue(filterAtom);
  const categoryState = useAtomValue(categoryAtom);
  const businessList = useAtomValue(businessAtom);
  const [filteredList, setFilteredList] = useAtom(filteredListAtom);
  const [renderingList, setRenderingList] = useAtom(renderingListAtom);
  const currentPage = useAtomValue(currentPageAtom);
  const userInfo = useAtomValue(userAtom);

  const [renderDataIndex, setRenderDataIndex] = useState([0, 4]);

  const filteredCategoryList = useMemo(
    () => filterCategory(businessList, categoryState),
    [businessList, categoryState],
  );
  const filteredBudgetList = useMemo(
    () => activeBudgetFilter(businessList, filterState),
    [businessList, filterState.budget],
  );
  const filteredGeoList = useMemo(() => activeGeoFilter(businessList, filterState), [businessList, filterState.geo]);

  useEffect(() => {
    let newList = businessList;

    if (type === "main") {
      if (categoryState !== "all") {
        newList = filteredCategoryList;
      }
      const GeoBudgetList = filteredGeoList.filter((item) => filteredBudgetList.includes(item));
      newList = newList.filter((item) => GeoBudgetList.includes(item));
    } else {
      if (categoryState !== "all") {
        newList = filteredCategoryList;
      }
      newList = newList.filter((item) => userInfo.wishList.includes(item.id));
    }
    setFilteredList(newList);
  }, [
    type,
    businessList,
    userInfo.wishList,
    categoryState,
    filteredGeoList,
    filteredBudgetList,
    filteredCategoryList,
    setFilteredList,
    filterState,
  ]);

  useEffect(() => {
    setRenderDataIndex(() => [currentPage * 5 - 5, currentPage * 5 - 1]);
  }, [currentPage]);

  useEffect(() => {
    setRenderingList(() => filteredList.slice(renderDataIndex[0], renderDataIndex[1] + 1));
  }, [filteredList, renderDataIndex, setRenderingList]);

  // renderingList 배열에서 5개씩 나눠서 렌더링 해야 함
  // 현재페이지 : 1 -> 0~4 / 2 -> 5~9 / 3 -> 10~14
  // 렌더링 해야하는 데이터 index = (현재페이지 * 5 - 5) ~ (현재페이지 * 5 - 1)

  return (
    <>
      {businessList.length ? (
        !renderingList.length ? (
          <div className="mb-16">조건에 해당하는 사업자가 존재하지 않습니다.</div>
        ) : (
          renderingList.map((data) => (
            <div
              key={data.id}
              className="w-full h-28 rounded-lg flex justify-between items-center mb-4 text-xs sm:text-base"
            >
              <Link to={`/business/${data.id}`} className="flex items-center">
                {data.image ? (
                  <img src={data.image} alt={data.name} className="w-16 h-16 sm:w-28 sm:h-28 mr-4 rounded-lg"></img>
                ) : (
                  <div className="w-16 h-16 sm:w-28 sm:h-28 mr-4 rounded-lg bg-gray-200 flex justify-center items-center">
                    no image
                  </div>
                )}
                {/* 이미지 */}
                <RenderIcon category={data.category} /> {/* 카테고리 아이콘 */}
                <div className="h-full flex flex-col md:flex-row md:items-center">
                  <div className="md:ml-4 w-28 md:w-36 lg:w-40 xl:w-48 text-ellipsis overflow-hidden">
                    <p className="inline-block w-full break-keep">
                      <b>{data.name}</b>
                    </p>
                    <p
                      className="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap"
                      title={`${data.address.city} ${data.address.county} ${data.address.detail_address}`}
                    >
                      {data.address.city} {data.address.county} {data.address.detail_address}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-6 text-xs sm:text-sm md:mt-0 md:ml-6">
                    {(data.category === "place" || data.category === "food") && `수용인원: ${data.possible_amount}명`}
                  </div>
                </div>
              </Link>
              <div className="flex items-center">
                <div className="flex flex-col items-center mr-4">
                  {data.min_cost && data.max_cost ? (
                    <>
                      <p>{data.min_cost.toLocaleString()}원</p>
                      <p>~</p>
                      <p>{data.max_cost.toLocaleString()}원</p>
                    </>
                  ) : (
                    <p>업체문의</p>
                  )}
                </div>
                {/* 하트 아이콘 */}
                <HeartIcon id={data.id} check={userInfo.wishList.includes(data.id)} />
              </div>
            </div>
          ))
        )
      ) : (
        <BusinessListSkeleton />
      )}
    </>
  );
};

export default BusinessList;
