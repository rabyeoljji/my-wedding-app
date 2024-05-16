import { auth, db } from "../firebase/index";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export interface SignUpInputType {
  email: string;
  password: string;
  passwordCheck?: string;
  nickname: string;
}

export const setUser = ({ email, password, nickname }: SignUpInputType) => {
  const onRegister = async () => {
    // 회원가입에 필요한 정보를 다 입력하지 않으면 나오는 에러문구
    if (!email || !password || !nickname) {
      alert("이메일 비밀번호 닉네임을 모두 입력해주세요.");
    }
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const user = credential.user;

      // user collection에 user.uid라는 ID를 가진 문서를 하나 만들고
      // 해당 문서에 아래와 같은 정보를 저장한다.
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: nickname,
        wish_list: [],
        reviews: [],
      });
      // 저장이 성공하면 성공 alert를 사용자에게 보여준다.
      alert("회원가입에 성공하셨습니다. 로그인 해주세요.");
      return true;
    } catch (err: any) {
      switch (err.code) {
        case "auth/invalid-email":
          alert("이메일을 바르게 입력해주세요.");
          break;
        case "auth/weak-password":
          alert("비밀번호가 너무 단순합니다. 좀 더 복잡한 비밀번호를 입력해주세요");
          break;
        case "auth/email-already-in-use":
          alert("등록된 이메일 입니다.");
          break;
        default:
          alert("회원가입 실패");
          break;
      }
      return false;
    }
  };
  return onRegister();
};
