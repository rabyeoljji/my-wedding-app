import { useNavigate } from "react-router";
import { ChangeEvent, FormEvent, useState } from "react";
import { useLogin } from "../auth/LoginOutAuth";
import { useSetAtom } from "jotai";
import { fetchUniqueUser, userAtom } from "../store/userInfo";
import GoogleLoginBtn from "../auth/socialLogin/GoogleLoginBtn";
import KakaoLoginBtn from "../auth/socialLogin/KakaoLoginBtn";

const LoginUser = (): JSX.Element => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const login = useLogin();

  const setUserInfo = useSetAtom(userAtom);

  const moveSignUpPage = () => {
    navigate("/sign-up");
  };

  const changeState = (e: ChangeEvent) => {
    const inputTarget = e.target as HTMLInputElement;
    if (inputTarget.name === "email") {
      setInputState({
        ...inputState,
        email: inputTarget.value,
      });
    }
    if (inputTarget.name === "password") {
      setInputState({
        ...inputState,
        password: inputTarget.value,
      });
    }
  };

  const submitLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputState.email || !inputState.password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    if (inputState.password.length < 6 || inputState.password.length > 12) {
      alert("비밀번호는 6~12자리로만 설정이 가능합니다.");
      return;
    }

    const uid = login({ ...inputState });

    if ((await uid).valueOf()) {
      fetchUniqueUser("users", (await uid).valueOf()).then((result) => {
        if (result) {
          setUserInfo({
            uid: result.uid,
            nickname: result.username,
            wishList: result.wish_list,
            reviews: result.reviews,
          });
        }
      });
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-24 mb-20">
      <h1 className="text-3xl font-bold mb-12">LOGIN</h1>
      <form className="flex justify-center items-center" onSubmit={(e) => submitLogin(e)}>
        <div className="flex flex-col justify-center items-center">
          <div className="w-64 sm:w-96 flex justify-between items-center my-2">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-slate-400 placeholder:text-xs indent-2.5 py-1"
              placeholder="mywedding@example.com"
              onChange={(e) => changeState(e)}
            ></input>
          </div>
          <div className="w-64 sm:w-96 flex justify-between items-center mb-2">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-xs indent-2.5 py-1"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => changeState(e)}
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="h-16 border-solid border-2 border-gray-200 rounded px-2 py-1 ml-4 hover:bg-indigo-200 hover:border-indigo-300 transition-all"
        >
          LOGIN
        </button>
      </form>
      <GoogleLoginBtn />
      <KakaoLoginBtn />
      <div className="flex justify-between items-center w-80 mb-12">
        <button
          type="button"
          className="border-solid border-2 border-gray-200 rounded px-4 py-1 mt-12 hover:bg-gray-200 transition-all"
          onClick={() => moveSignUpPage()}
        >
          회원가입
        </button>
        <button
          type="button"
          className="border-solid border-2 border-gray-200 rounded px-4 py-1 mt-12 hover:bg-gray-200 transition-all"
          onClick={() => navigate("/password-reset")}
        >
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default LoginUser;
