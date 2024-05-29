import Slider from "../common/Slider";
import BusinessList from "../components/BusinessList";
import CategoryBar from "../components/CategoryBar";
import Pagination from "./Pagination";

const Main = (): JSX.Element => {
  return (
    <div className="w-4/5 flex flex-col items-center">
      <div className="w-full h-auto flex justify-center sm:justify-between items-start pt-12 sm:pt-20 pb-12">
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
