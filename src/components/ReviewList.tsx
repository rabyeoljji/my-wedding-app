import { useAtom, useAtomValue } from "jotai";
import { renderReviewListAtom, reviewListAtom } from "../store/review";
import Rating from "../common/Rating";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { currentPageAtom } from "../store/page";
import { ReviewListPropsType } from "../@types/Review";

const ReviewList = ({ type, list, businessItemId }: ReviewListPropsType) => {
  // type === business ? list === businessReviewList : list === userReviewList
  const reviewList = useAtomValue(reviewListAtom); // 전체 리뷰리스트
  const [renderReviewList, setRenderReviewList] = useAtom(renderReviewListAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [renderDataIndex, setRenderDataIndex] = useState([0, 4]);

  useEffect(() => {
    setCurrentPage(() => 1);
  }, []);

  useEffect(() => {
    setRenderDataIndex(() => [currentPage * 5 - 5, currentPage * 5 - 1]);
  }, [currentPage]);

  useEffect(() => {
    setRenderReviewList(() => list.slice(renderDataIndex[0], renderDataIndex[1] + 1));
  }, [list, renderDataIndex, setRenderReviewList]);

  return (
    <>
      {type === "business" ? (
        !renderReviewList.length ? (
          <div className="w-full h-10 border-b-2 border-solid border-gray-200 flex justify-between items-center px-4">
            작성된 리뷰가 없습니다.
          </div>
        ) : (
          renderReviewList.map((id: string) => {
            const reviewItem = reviewList.find((item) => item.id === id);
            if (reviewItem)
              return (
                <Link
                  to={`/review-page/${id}_itemID:${businessItemId}`}
                  key={id}
                  className="w-full h-10 border-b-2 border-solid border-gray-200 flex justify-between items-center px-4"
                >
                  <p className="text-xs sm:text-base">{reviewItem.title}</p>
                  <Rating type="view" reviewId={reviewItem.id} score={reviewItem.stars} />
                </Link>
              );
          })
        )
      ) : !renderReviewList.length ? (
        <div>작성한 리뷰가 없습니다.</div>
      ) : (
        renderReviewList.map((id: string) => {
          const reviewItem = reviewList.find((item) => item.id === id);
          if (reviewItem) {
            if (!businessItemId) {
              const businessItemId = reviewItem.business_id;
              return (
                <Link
                  to={`/review-page/${id}_itemID:${businessItemId}`}
                  key={id}
                  className="w-full h-28 rounded-lg flex justify-between items-center mb-4 text-xs sm:text-base"
                >
                  <div className="flex justify-center items-center">
                    {reviewItem.image ? (
                      <img
                        src={reviewItem.image}
                        alt="리뷰 첨부 이미지"
                        className="w-16 min-w-12 h-16 sm:w-28 sm:h-28 mr-4 rounded-lg"
                      ></img>
                    ) : (
                      <div className="w-16 h-16 sm:w-28 sm:h-28 mr-4 rounded-lg bg-gray-200 flex justify-center items-center">
                        no image
                      </div>
                    )}
                    <p className="w-24 sm:48 md:w-64 text-xs sm:text-base overflow-hidden text-ellipsis whitespace-nowrap">
                      {reviewItem.title}
                    </p>
                  </div>
                  <div className="flex flex-col-reverse items-end sm:flex-row justify-center sm:items-center">
                    <p className="text-[0.5rem] sm:text-sm">{`(작성일 : ${reviewItem.date[0]}.${reviewItem.date[1]}.${reviewItem.date[2]})`}</p>
                    <Rating type="view" reviewId={reviewItem.id} score={reviewItem.stars} userList={type === "user"} />
                  </div>
                </Link>
              );
            }
          }
        })
      )}
    </>
  );
};

export default ReviewList;
