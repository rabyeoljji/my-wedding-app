import { Link } from "react-router-dom";
import myWeddingLogo from "../assets/logo/project_logo.png";
import myWeddingLogoMobile from "../assets/logo/project_logo_mobile.png";
import Search from "./navItems/Search";
import SearchBtn from "./navItems/SearchBtn";
import User from "./navItems/User";
import { useSetAtom } from "jotai";
import { categoryAtom, initialCategory } from "../store/category";
import { currentPageAtom } from "../store/page";
import { filterAtom, initialFilter } from "../store/filter";

function Nav() {
  const setCategoryState = useSetAtom(categoryAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);
  const setFilterState = useSetAtom(filterAtom);

  const goHomeAndReset = () => {
    setCategoryState(() => initialCategory);
    setCurrentPage(() => 1);
    setFilterState(() => initialFilter);
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-28 pt-0 sm:h-20 bg-indigo-50 sm:mt-8 sticky top-0 z-30">
        <SearchBtn />
        <Link to="/" onClick={() => goHomeAndReset()} aria-label="메인화면으로 이동">
          <img className="hidden sm:inline-block h-20" src={myWeddingLogo} alt="로고이미지" />
        </Link>
        <Link to="/" onClick={() => goHomeAndReset()} aria-label="메인화면으로 이동">
          <img className="sm:hidden h-20" src={myWeddingLogoMobile} alt="로고이미지" />
        </Link>
        <Search isMobile={false} />
        <User />
      </div>
    </>
  );
}

export default Nav;
