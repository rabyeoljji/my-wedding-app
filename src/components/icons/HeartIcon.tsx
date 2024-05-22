import { useAtom } from "jotai";
import { deleteWishList, postWishList } from "../../store/fetchData";
import { userAtom } from "../../store/userInfo";

const HeartIcon = ({ id, check }: { id: string; check?: boolean }): JSX.Element => {
  const [userInfo, setUserInfo] = useAtom(userAtom);

  // useEffect(() => {
  //   console.log(userInfo.wishList);
  // }, [userInfo.wishList]);

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    const parameters = {
      userId: userInfo.uid,
      wishList: userInfo.wishList,
      itemId: id,
    };
    if (!check && target.classList.contains("heartIcon")) {
      setUserInfo((userInfo) => ({
        ...userInfo,
        wishList: [...userInfo.wishList, id],
      }));
      postWishList(parameters);
    } else if (check && target.classList.contains("heartIcon")) {
      setUserInfo((userInfo) => ({
        ...userInfo,
        wishList: userInfo.wishList.filter((id) => id !== id),
      }));
      deleteWishList(parameters);
    }
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={check ? `#E44848` : `#c0c0c0`}
        className="heartIcon cursor-pointer"
        onClick={(e) => handleClick(e)}
      >
        <path
          d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"
          className="heartIcon"
        ></path>
      </svg>
    </>
  );
};

export default HeartIcon;
