import { Link } from "react-router-dom";
import Drawer from "../../common/Drawer";

function User() {
  return (
    <div className="flex justify-center items-center md:justify-end min-w-12 w-12 ml-4 md:w-52 md:mr-8">
      <Link to={"/login"} className="hidden md:inline-block text-sm w-16">
        LOGIN
      </Link>
      <Link to={"/sign-up"} className="hidden md:inline-block text-sm w-20">
        SIGN UP
      </Link>
      <Drawer />
    </div>
  );
}

export default User;
