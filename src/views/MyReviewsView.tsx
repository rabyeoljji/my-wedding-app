import { useAtomValue } from "jotai";
import ReviewList from "../components/ReviewList";
import { userAtom } from "../store/userInfo";
import Pagination from "../components/Pagination";

const MyReviewsView = (): JSX.Element => {
  const userInfo = useAtomValue(userAtom);

  return (
    <div className="w-4/5 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold my-16">내가 작성한 리뷰</h2>
      <ReviewList type="user" list={userInfo.reviews} />
      <Pagination type="review-user" list={userInfo.reviews} />
    </div>
  );
};

export default MyReviewsView;
