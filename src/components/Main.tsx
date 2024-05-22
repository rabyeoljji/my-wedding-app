import { useSetAtom } from "jotai";
import Slider from "../common/Slider";
import BusinessList from "../components/BusinessList";
import CategoryBar from "../components/CategoryBar";
import Pagination from "./Pagination";
import { categoryAtom } from "../store/category";
import { useEffect } from "react";

const Main = (): JSX.Element => {
  const setCategoryState = useSetAtom(categoryAtom);

  useEffect(() => {
    setCategoryState(() => "all");
  }, []);

  // page를 새로고침 시에도 유지하려면 category, filter상태, pageList, currentPage상태가 쿠키에 저장되어야함

  return (
    <div className="w-4/5 flex flex-col items-center">
      <div className="w-full h-auto flex justify-center sm:justify-between items-start pt-20 pb-12">
        <div className="flex flex-col w-full h-full lg:w-2/3 sm:ml-8 sm:mr-12">
          <CategoryBar />
          <BusinessList type="main" />
        </div>
        <Slider />
      </div>
      <Pagination type="main" />
    </div>
  );
};

export default Main;
