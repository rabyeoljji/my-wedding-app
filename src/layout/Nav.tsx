import { Link } from "react-router-dom";
import myWeddingLogo from "../assets/logo/project_logo.png";
import myWeddingLogoMobile from "../assets/logo/project_logo_mobile.png";
import Search from "./navItems/Search";
import SearchBtn from "./navItems/SearchBtn";
import User from "./navItems/User";

function Nav() {
  return (
    <>
      <div className="flex justify-center items-center w-screen h-28 pt-0 sm:h-20 bg-indigo-50 sm:mt-8 sticky top-0">
        <SearchBtn />
        <Link to="/">
          <img className="hidden sm:inline-block h-20" src={myWeddingLogo} alt="로고이미지" />
        </Link>
        <Link to="/">
          <img className="sm:hidden h-20" src={myWeddingLogoMobile} alt="로고이미지" />
        </Link>
        <Search isMobile={false} />
        <User />
      </div>
    </>
  );
}

export default Nav;
