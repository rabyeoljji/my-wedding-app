import { useLocation, useNavigate, useParams } from "react-router";
import Pagination from "./Pagination";
import { useAtom, useAtomValue } from "jotai";
import { businessAtom } from "../store/company";
import { RenderIcon } from "./icons/RenderIcon";
import { categories } from "../@types/Filter";
import HeartIcon from "./icons/HeartIcon";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { userAtom } from "../store/userInfo";
import { v4 as uuid4 } from "uuid";
import ReviewList from "./ReviewList";
import { fetchAllBusiness } from "../store/fetchData";
import { drawerAtom } from "../store/drawer";
import { reviewListAtom } from "../store/review";
import Rating from "../common/Rating";
import { SESSION_LOCATION } from "../constants/sessionStorage";

const BusinessItem = (): JSX.Element => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [businessList, setBusinessList] = useAtom(businessAtom);
  const businessReviews = useMemo(() => {
    return businessList.find((item) => item.id === id)?.reviews;
  }, [businessList, id]);

  const userInfo = useAtomValue(userAtom);
  const drawerState = useAtomValue(drawerAtom);
  const reviewList = useAtomValue(reviewListAtom);
  const [renderReviews, setRenderReviews] = useState<string[]>([]);

  const item = businessList.find((item) => item.id === id);

  useEffect(() => {
    sessionStorage.removeItem(SESSION_LOCATION);

    if (location.state === "reviewEdit") {
      fetchAllBusiness().then((list) => {
        setBusinessList(() => list);
      });
    }

    if (item) {
      setRenderReviews(() => item.reviews);
    } else if (id) {
      setRenderReviews(() => businessReviews);
    }
  }, []);

  const calcScores = () => {
    const reviews = reviewList.filter((reviewItem) => renderReviews.includes(reviewItem.id));
    let scoreArray: number[] = [];
    reviews.forEach((reviewItem) => {
      scoreArray.push(reviewItem.stars);
    });
    const initialValue = 0;
    const sumScores = scoreArray.reduce((acc, cur) => acc + cur, initialValue);
    return (sumScores / scoreArray.length).toFixed(1);
  };

  // 개별 사업자 렌더링
  return (
    <>
      {item ? (
        <div className="w-4/5 flex flex-col items-center pt-20 mb-16">
          <div id="businessItemInfo" className="w-full flex flex-col md:px-10 lg:px-20 mb-8">
            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="w-full flex flex-col sm:flex-row justify-center md:justify-start items-center">
                <img src={item.image} className="w-56 sm:w-40 h-40 rounded-lg mb-8 sm:mb-0 sm:mr-4" />
                <div className="flex flex-col w-52 sm:w-64 lg:w-80">
                  <div className="flex justify-between items-center">
                    <div className="hidden sm:inline-block w-20 flex items-center">
                      <RenderIcon category={item.category} />
                      <p className="inline-block md:ml-2">
                        {categories.find((value) => value.en === item.category)?.kr}
                      </p>
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
                  {item.category === ("place") || item.category === ("food") && <div>수용 가능 인원 : {item.possible_amount}명</div>}
                </div>
              </div>
              <div className="border-2 border-solid border-gray-200 rounded-lg flex flex-col justify-center items-center w-full min-w-36 md:w-60 lg:w-80 h-40 md:h-40 mt-8 md:mt-0 ml-4">
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
            <p>평점 : {!item.reviews.length ? "아직 작성된 리뷰가 없어요!" : calcScores()}</p>
            {item.reviews.length !== 0 && (
              <Rating type="view" reviewId={item.id} score={Math.round(Number(calcScores()))} />
            )}
          </div>
          <div id="reviewContainer" className="w-full border-2 border-solid border-gray-200 mb-12">
            <div className="w-full h-10 border-b-2 border-solid border-gray-200 flex justify-center items-center">
              {`리뷰 (${item.reviews.length}개)`}
              <Link
                to={`/review-edit-page/${uuid4()}_itemID:${id}`}
                className={`px-2 py-1 bg-indigo-200 hover:bg-indigo-500 rounded-lg hover:text-white absolute right-12 sm:right-24 lg:right-36 xl:right-48 ${drawerState && "-z-10"}`}
                onClick={(e) => {
                  if (!userInfo.uid) {
                    e.preventDefault();
                    alert("로그인 후 이용하실 수 있습니다.");
                    navigate("/login");
                    return;
                  }
                }}
              >
                작성하기
              </Link>
            </div>
            <ReviewList type="business" list={renderReviews} businessItemId={id ?? ""} />
            <div className="w-full h-10"></div>
          </div>
          {renderReviews.length > 5 && <Pagination type="review-business" list={item.reviews} />}
        </div>
      ) : (
        <div>해당 사업자를 찾을 수 없습니다.</div>
      )}
    </>
  );
};

export default BusinessItem;
