import Drawer from "../../common/Drawer";

function User() {
  return (
    <div className="flex justify-center items-center md:justify-end min-w-12 w-56 md:mr-8">
      <button className="hidden md:inline-block text-sm w-16">LOGIN</button>
      <button className="hidden md:inline-block text-sm w-20">SIGN UP</button>
      <Drawer />
    </div>
  );
}

export default User;
