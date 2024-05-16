import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useSetAtom } from "jotai";
import { fetchUniqueData, userAtom } from "../store/userInfo";
import { doc, setDoc } from "firebase/firestore";

export const useLoginStateUpdate = () => {
  const setUserInfo = useSetAtom(userAtom);

  const authConnectState = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userInfo = await fetchUniqueData("users", user.uid);
        if (userInfo) {
          setUserInfo({
            uid: userInfo.uid,
            nickname: userInfo.username,
            wishList: userInfo.wish_list,
            reviews: userInfo.reviews,
          });
        } else {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            username: user.displayName,
            wish_list: [],
            reviews: [],
          });
          window.location.reload();
        }
      }
    });
  };

  return authConnectState;
};
