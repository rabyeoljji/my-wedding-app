import { Link } from "react-router-dom";
import Drawer from "../../common/Drawer";
import { useAtomValue } from "jotai";
import { userAtom } from "../../store/userInfo";

function User() {
  const userInfo = useAtomValue(userAtom);

  return (
    <div className="flex justify-center items-center md:justify-end min-w-12 w-12 ml-4 md:w-52 md:mr-8">
      {userInfo.nickname === "" ? (
        <>
          <Link to={"/login"} className="hidden md:inline-block text-sm w-16">
            LOGIN
          </Link>
          <Link to={"/sign-up"} className="hidden md:inline-block text-sm w-20">
            SIGN UP
          </Link>
        </>
      ) : (
        <p className="hidden md:inline-block test-sm mr-4">{userInfo.nickname} 님</p>
      )}
      <Drawer />
    </div>
  );
}

export default User;
