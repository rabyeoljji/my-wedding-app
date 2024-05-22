import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "../store/userInfo";
import { Link, useParams } from "react-router-dom";
import BusinessList from "./BusinessList";
import CategoryBar from "./CategoryBar";
import { useEffect } from "react";
import { categoryAtom } from "../store/category";
import { categoryType } from "../@types/Filter";
import Pagination from "./Pagination";

const UserProfile = (): JSX.Element => {
  const { category } = useParams();
  const userInfo = useAtomValue(userAtom);
  const setCategory = useSetAtom(categoryAtom);

  useEffect(() => {
    if (category && category !== "all") {
      setCategory(() => category as categoryType);
    }
  }, [category]);

  return (
    <>
      <div className="w-4/5 flex flex-col items-center">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center my-12 mb-20 sm:mb-12">
          <div className="flex items-center">
            <div className="w-32 h-32 bg-indigo-200 flex justify-center items-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                fill="white"
                className="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </div>
            <p className="text-xl font-bold ml-8">{userInfo.nickname}</p>
          </div>
          <Link
            to={"/my-reviews"}
            className="w-56 h-10 bg-indigo-100 rounded-lg mt-4 flex justify-center items-center hover:bg-indigo-300 hover:text-white transition-all"
          >
            내가 작성한 리뷰
          </Link>
        </div>
        <div className="wishList w-full flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-8">WISH LIST</h2>
          <CategoryBar />
          <BusinessList type="wishList" />
        </div>
        <Pagination type="main" />
      </div>
    </>
  );
};

export default UserProfile;
