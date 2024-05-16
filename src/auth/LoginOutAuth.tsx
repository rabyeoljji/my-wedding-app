import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initialAuth, userAuthAtom } from "../store/userInfo";
import { auth } from "../firebase";
import { useSetAtom } from "jotai";

export interface LoginInputType {
  email: string;
  password: string;
}

export const useLogin = () => {
  const setAuthInfo = useSetAtom(userAuthAtom);

  const login = async ({ email, password }: LoginInputType) => {
    try {
      // 현재 탭에서는 로그인이 지속되도록 하기 위해
      await setPersistence(auth, browserSessionPersistence);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = user;
      const JWT_TOKEN = user.getIdToken(); //json web token반환
      setAuthInfo({ uid, email, authToken: JWT_TOKEN });
      return uid;
    } catch ({ code, message }: any) {
      alert(message[code]);
      return "";
    }
  };
  return login;
};

export const useLogout = () => {
  const setAuthInfo = useSetAtom(userAuthAtom);
  const logout = async () => {
    const isLogOut = window.confirm("로그아웃 하시겠습니까?");
    if (!isLogOut) return;

    try {
      await signOut(auth);
      setAuthInfo(initialAuth);
      return true;
    } catch ({ code, message }: any) {
      alert(message[code]);
      return false;
    }
  };
  return logout;
};
