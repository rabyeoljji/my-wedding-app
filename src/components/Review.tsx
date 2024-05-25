import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { userAtom } from "../store/userInfo";
import {
  deleteBusinessReview,
  deleteDataBaseReview,
  deleteUserReview,
  postBusinessReview,
  postReview,
  postUserReview,
} from "../store/fetchData";
import { ReviewType } from "../@types/Review";
import { businessAtom } from "../store/company";
import Rating from "../common/Rating";
import { reviewListAtom } from "../store/review";
import { Link } from "react-router-dom";

const Review = ({ type }: { type: "editor" | "view" }): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const businessList = useAtomValue(businessAtom);
  const reviewList = useAtomValue(reviewListAtom);
  const [userInfo, setUserInfo] = useAtom(userAtom);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<number[]>([]);
  const [stars, setStars] = useState(0);

  const titleInputRef = useRef() as React.LegacyRef<HTMLInputElement> | undefined;
  const contentInputRef = useRef() as React.LegacyRef<HTMLTextAreaElement> | undefined;

  const reviewId = id?.split("_itemID:")[0] ?? "";
  const itemId = id?.split("_itemID:")[1] ?? "";

  useEffect(() => {
    const date = new Date();
    setDate(() => [date.getFullYear(), date.getMonth() + 1, date.getDate()]);

    const reviewItem = reviewList.find((item) => item.id === reviewId);
    if (type === "view" || (type === "editor" && reviewItem)) {
      if (reviewItem) {
        setStars(() => reviewItem.stars);
        setTitle(() => reviewItem.title);
        setContent(() => reviewItem.contents);
      }
    }
  }, [reviewId, reviewList, type]);

  const isUsersReview = () => {
    if (reviewId) {
      return userInfo.reviews.includes(reviewId);
    } else {
      console.log("error: reviewId가 존재하지 않습니다.");
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    if (target.id === "reviewTitle") {
      setTitle(() => target.value);
    }
    if (target.id === "reviewContent") {
      setContent(() => target.value);
    }
    if (target.name === `rating-${reviewId}`) {
      setStars(() => Number(target.value));
    }
  };

  const deleteReview = async () => {
    if (itemId && reviewId) {
      const businessReviews = businessList.find((item) => item.id === itemId)?.reviews;
      await deleteBusinessReview({ itemId, reviewList: businessReviews, reviewId });
      await deleteUserReview({ itemId: userInfo.uid, reviewList: userInfo.reviews, reviewId });
      await deleteDataBaseReview(reviewId);
      alert("리뷰가 삭제되었습니다");
    } else if (!reviewId) {
      console.log("error: reviewID가 존재하지 않습니다.");
    } else if (!itemId) {
      console.log("error: itemID가 존재하지 않습니다.");
    }
    setUserInfo((userInfo) => ({
      ...userInfo,
      reviews: userInfo.reviews.filter((id) => id !== reviewId),
    }));
  };

  const addReview = async () => {
    if (reviewId && itemId) {
      const newReview: ReviewType = {
        id: reviewId,
        title: title,
        contents: content,
        date: date,
        stars: stars,
        writer: userInfo.uid,
        business_id: itemId,
        image: "",
      };
      const businessReviews = businessList.find((item) => item.id === itemId)?.reviews;

      const reviewItem = reviewList.find((item) => item.id === reviewId);
      if (reviewItem) {
        await postReview(newReview);
        return;
      }

      setUserInfo((userInfo) => ({
        ...userInfo,
        reviews: [...userInfo.reviews, reviewId],
      }));
      await postReview(newReview);
      await postBusinessReview({ itemId, reviewList: businessReviews, reviewId });
      await postUserReview({ itemId: userInfo.uid, reviewList: userInfo.reviews, reviewId });
      alert("리뷰가 작성되었습니다");
    } else if (!reviewId) {
      console.log("error: reviewID가 존재하지 않습니다.");
    } else if (!itemId) {
      console.log("error: itemID가 존재하지 않습니다.");
    }
  };

  return (
    <div className="w-4/5 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold my-10">Review</h2>
      <div className="w-full">
        <Link
          to={`/business/${itemId}`}
          className="w-48 bg-indigo-100 px-2 py-1 rounded-lg flex justify-center items-center mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <p className="ml-4">
            해당 사업자
            <br />
            페이지로 이동하기
          </p>
        </Link>
        <form className="w-full flex flex-col" onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center border-solid border-2 border-gray-200 px-2 py-1">
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              id="reviewTitle"
              className="w-1/2 focus:outline-none px-2 py-1 placeholder:text-xs placeholder:sm:text-base"
              readOnly={type === "view" ? true : false}
              ref={titleInputRef}
              value={title}
              onChange={(e) => handleChange(e)}
            />
            <div className="info w-1/2 flex flex-col-reverse justify-center items-end sm:flex-row sm:justify-end sm:items-center">
              <p className="text-[0.5rem] sm:text-sm">{`(작성일 : ${date[0]}년 ${date[1]}월 ${date[2]}일)`}</p>
              <Rating type={type} reviewId={reviewId} changeFn={handleChange} score={stars} />
            </div>
          </div>
          <div className="border-solid border-2 border-gray-200 px-2 py-1">
            <textarea
              placeholder="내용을 입력해주세요"
              id="reviewContent"
              className="block w-full h-80 focus:outline-none px-2 py-1 placeholder:text-xs placeholder:sm:text-base"
              readOnly={type === "view" ? true : false}
              ref={contentInputRef}
              value={content}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div className="flex justify-end my-4 mb-12">
            {type === "view" ? (
              isUsersReview() && (
                <>
                  <button
                    type="button"
                    className="px-4 py-1 bg-indigo-100 rounded-lg hover:bg-indigo-200"
                    onClick={async () => {
                      await deleteReview();
                      navigate(`/`);
                      window.location.reload();
                    }}
                  >
                    삭제
                  </button>
                  <Link
                    to={`/review-edit-page/${reviewId}_itemID:${itemId}`}
                    type="button"
                    className="px-4 py-1 ml-4 bg-indigo-100 rounded-lg hover:bg-indigo-200"
                  >
                    편집하기
                  </Link>
                </>
              )
            ) : (
              <>
                <button
                  type="button"
                  className="px-4 py-1 bg-indigo-100 rounded-lg hover:bg-indigo-200"
                  onClick={() => navigate(-1)}
                >
                  취소
                </button>

                <button
                  type="button"
                  className="px-4 py-1 bg-indigo-100 rounded-lg ml-4 hover:bg-indigo-200"
                  onClick={async () => {
                    await addReview();
                    navigate(`/`, { state: "reviewEdit", replace: true });
                    window.location.reload();
                  }}
                >
                  저장
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
