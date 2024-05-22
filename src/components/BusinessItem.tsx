import { useParams } from "react-router";
import Pagination from "./Pagination";
import { useAtomValue } from "jotai";
import { renderingListAtom } from "../store/company";
import { RenderIcon } from "./icons/RenderIcon";
import { categories } from "../@types/Filter";
import HeartIcon from "./icons/HeartIcon";
import { useEffect, useState } from "react";
import { ReviewType } from "../@types/Review";
import { Link } from "react-router-dom";
import { userAtom } from "../store/userInfo";

const BusinessItem = (): JSX.Element => {
  const { id } = useParams();
  const renderingList = useAtomValue(renderingListAtom);
  const userInfo = useAtomValue(userAtom);
  const [reviewList, setReviewList] = useState<ReviewType[]>([]);

  const item = renderingList.find((item) => item.id === id);

  useEffect(() => {
    if (item) {
      setReviewList(() => item.reviews);
    }
  }, []);

  // 개별 사업자 렌더링
  return (
    <>
      {item ? (
        <div className="w-4/5 flex flex-col items-center pt-20 mb-16">
          <div id="businessItemInfo" className="w-full flex flex-col md:px-10 lg:px-20 mb-8">
            <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-8">
              <div className="w-full flex flex-col sm:flex-row items-center">
                <img src={item.image} className="w-56 sm:w-40 h-40 rounded-lg mb-8 sm:mb-0 mr-4" />
                <div className="flex flex-col w-52 lg:w-80">
                  <div className="flex justify-between items-center">
                    <div className="hidden sm:inline-block flex items-center">
                      <RenderIcon category={item.category} />
                      {categories.find((value) => value.en === item.category)?.kr}
                    </div>
                    <HeartIcon id={id ?? ""} check={userInfo.wishList.includes(id ?? "")} />
                  </div>
                  <div className="mt-4 sm:mt-0 mb-4">
                    <p className="text-xl my-2">
                      <b>{item.name}</b>
                    </p>
                    <p>
                      {item.address.city} {item.address.county} {item.address.detail_address}
                    </p>
                  </div>
                  {item.category === ("place" || "food") && <div>수용 가능 인원 : {item.possible_amount}명</div>}
                </div>
              </div>
              <div className="border-2 border-solid border-gray-200 rounded-lg flex flex-col justify-center items-center w-full min-w-36 sm:w-40 md:w-60 lg:w-80 h-40 md:h-40 mt-8 sm:mt-0">
                <p className="inline-block mb-4">
                  <b>예상 비용</b>
                </p>
                {item.min_cost && item.max_cost ? (
                  <>
                    <p>{item.min_cost.toLocaleString()}원</p>
                    <p>~</p>
                    <p>{item.max_cost.toLocaleString()}원</p>
                  </>
                ) : (
                  <p>업체문의</p>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between mb-8">
              <div>
                <p>연락처 : {item.contact}</p>
                <p>
                  예약문의 :{" "}
                  <a
                    href={item.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-400 hover:underline break-all"
                  >
                    {item.homepage}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center md:px-10 lg:px-20 mb-8">
            <p>
              평점 : 아직 작성된 리뷰가 없어요!
              {/* 리뷰가 생성되면 기존 평점과 더해 평균 내고 score필드생성해 데이터베이스 정보 갱신 */}
            </p>
            <p>{/* 리뷰 별점 렌더링 */}</p>
          </div>
          {/* 리뷰리스트에 따라 렌더링 */}
          <div id="reviewContainer" className="w-full border-2 border-solid border-gray-200 mb-12">
            <div className="w-full h-10 border-b-2 border-solid border-gray-200 flex justify-center items-center">
              {`리뷰 (총 : ${item.reviews.length}개)`}
              <Link
                to={`/review-edit-page/${item.id}_review${item.reviews.length + 1}`}
                className="px-2 py-1 bg-indigo-200 hover:bg-indigo-500 rounded-lg hover:text-white absolute right-12 sm:right-20 lg:right-36 xl:right-48"
              >
                작성하기
              </Link>
            </div>
            {/* 리뷰 렌더링 될 위치 */}
            <div className="w-full h-10"></div>
          </div>
          {reviewList.length > 5 && <Pagination type="review" />}
        </div>
      ) : (
        <div>해당 사업자를 찾을 수 없습니다.</div>
      )}
    </>
  );
};

export default BusinessItem;
