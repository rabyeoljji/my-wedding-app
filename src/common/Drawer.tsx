import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "../store/userInfo";
import { Link } from "react-router-dom";
import { useLogout } from "../auth/LoginOutAuth";
import { categories } from "../@types/Filter";
import { drawerAtom } from "../store/drawer";
import { useEffect } from "react";

function Drawer() {
  const userInfo = useAtomValue(userAtom);
  const drawerState = useAtomValue(drawerAtom);
  const setDrawer = useSetAtom(drawerAtom);
  const logout = useLogout();

  useEffect(() => {
    console.log(drawerState);
  }, [drawerState]);

  const toggleDrawer = () => {
    setDrawer((state) => !state);
  };

  const closeDrawer = () => {
    document.getElementById("profileDrawer")?.click();
  };

  return (
    <>
      <div className="drawer drawer-end w-12">
        <input id="profileDrawer" type="checkbox" className="drawer-toggle" onClick={() => toggleDrawer()} />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="profileDrawer" className="drawer-button btn bg-white w-12 h-12 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="gray"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
          </label>
        </div>
        <div className="drawer-side z-[100]">
          <label htmlFor="profileDrawer" aria-label="close sidebar" className="drawer-overlay z-[100]"></label>
          <div className="menu p-4 w-72 sm:w-80 min-h-full bg-base-200 text-base-content flex flex-col items-center relative z-[9999]">
            {/* Sidebar content here */}
            <div className="bg-gray-200 w-56 h-28 mt-4 rounded-lg flex flex-col justify-end items-center">
              {userInfo.nickname === "" ? (
                <>
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    login 후 이용가능합니다.
                    <Link
                      to={"/login"}
                      className="bg-gray-300 w-16 h-4 mt-2 text-xs flex justify-center items-center rounded-lg"
                      onClick={() => closeDrawer()}
                    >
                      LOGIN
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to={"/profile/all"}
                    className="flex justify-between items-center w-28"
                    onClick={() => closeDrawer()}
                  >
                    <div className="bg-white w-12 h-12 rounded-full flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-person-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      </svg>
                    </div>
                    <p>{userInfo.nickname}</p>
                  </Link>
                  <button
                    className="bg-gray-300 w-16 h-4 text-xs mt-4 mb-2 flex justify-center items-center rounded-lg"
                    onClick={() => {
                      logout();
                      closeDrawer();
                      window.location.reload();
                    }}
                  >
                    LOGOUT
                  </button>
                </>
              )}
            </div>
            {userInfo.nickname !== "" && (
              <>
                <Link
                  to={"/my-reviews"}
                  className="w-56 h-10 bg-gray-200 rounded-lg mt-4 flex justify-center items-center hover:bg-gray-300 transition-all"
                  onClick={() => {
                    closeDrawer();
                  }}
                >
                  내가 작성한 리뷰
                </Link>
                <h3 className="mt-8 mb-4 text-xl font-bold">WISHLIST</h3>
                <ul>
                  {categories.map((category) => (
                    <li key={category.en} className="flex justify-center items-center text-lg">
                      <Link
                        to={`/profile/${category.en}`}
                        onClick={() => {
                          closeDrawer();
                        }}
                      >
                        {category.kr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Drawer;
