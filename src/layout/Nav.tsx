import myWeddingLogo from "../assets/logo/project_logo.png";
import Search from "./navItems/Search";
import User from "./navItems/User";

function Nav() {
  return (
    <>
      <div className="flex justify-center items-center w-screen h-20 bg-indigo-50 sm:mt-8">
        <img className="h-20" src={myWeddingLogo} alt="로고이미지" />
        <Search />
        <User />
      </div>
    </>
  );
}

export default Nav;
