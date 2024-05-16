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
    // 현재 탭에서는 로그인이 지속되도록 하기 위해
    await setPersistence(auth, browserSessionPersistence);
    const result = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const { uid } = user;
        const JWT_TOKEN = user.getIdToken(); //json web token반환
        setAuthInfo({ uid, email, authToken: JWT_TOKEN });
        return uid;
      })
      .catch((error) => {
        console.log(error);
        if (error.code == "auth/invalid-email") {
          alert("이메일 형식을 확인해주세요");
        }
        if (error.code == "auth/user-not-found") {
          alert("존재하지 않는 계정입니다");
        }
        if (error.code == "auth/wrong-password") {
          alert("비밀번호를 다시 확인해주세요");
        }
        if (error.code == "auth/too-many-requests") {
          alert("잠시 후 다시 시도해 주세요");
        }
        if (error.code == "auth/invalid-login-credentials") {
          alert("이메일과 비밀번호를 확인해주세요");
        }
        return "";
      });
    return result;
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
