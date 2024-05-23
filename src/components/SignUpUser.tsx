import { ChangeEvent, FormEvent, MutableRefObject, useRef, useState } from "react";
import { setUser } from "../auth/SignUpAuth";
import { useNavigate } from "react-router";

const SignUpUser = (): JSX.Element => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
  });
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>,
    passwordCheckRef = useRef() as MutableRefObject<HTMLInputElement>;

  const navigate = useNavigate();

  const passwordInput = passwordRef.current,
    passwordCheckInput = passwordCheckRef.current;

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
    if (inputTarget.name === "checkPassword") {
      setInputState({
        ...inputState,
        passwordCheck: inputTarget.value,
      });
    }
    if (inputTarget.name === "nickname") {
      setInputState({
        ...inputState,
        nickname: inputTarget.value,
      });
    }
  };

  const submitSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!inputState.email || !inputState.password || !inputState.passwordCheck || !inputState.nickname) {
      alert("이메일 비밀번호 닉네임을 모두 입력해주세요.");
      return;
    }
    if (inputState.password.length < 6 || inputState.password.length > 12) {
      alert("비밀번호는 6~12자리로만 설정이 가능합니다.");
      passwordInput.focus();
      return;
    }
    if (inputState.password !== inputState.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      passwordCheckInput.focus();
      return;
    }

    const result = setUser({ ...inputState });

    if ((await result).valueOf()) {
      navigate("/");
    }
  };

  return (
    <form className="flex flex-col justify-center items-center mt-24 mb-20 w-4/5" onSubmit={(e) => submitSignUp(e)}>
      <h1 className="text-3xl font-bold mb-12">회원가입</h1>
      <div className="w-full sm:w-96 flex justify-between items-center mb-2">
        <label>이메일</label>
        <input
          type="email"
          name="email"
          className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-slate-400 placeholder:text-xs indent-2.5 py-1"
          placeholder="mywedding@example.com"
          onChange={(e) => changeState(e)}
        ></input>
      </div>
      <div className="w-full sm:w-96 flex justify-between items-center mb-2">
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-xs indent-2.5 py-1"
          placeholder="(영문,특수문자 포함 6~12자리)"
          ref={passwordRef}
          onChange={(e) => changeState(e)}
        ></input>
      </div>
      <div className="w-full sm:w-96 flex justify-between items-center mb-2">
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="checkPassword"
          className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-xs indent-2.5 py-1"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          ref={passwordCheckRef}
          onChange={(e) => changeState(e)}
        ></input>
      </div>
      <div className="w-full sm:w-96 flex justify-between items-center mt-10">
        <label>닉네임</label>
        <input
          type="text"
          name="nickname"
          className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-xs indent-2.5 py-1"
          placeholder="닉네임을 입력해주세요"
          onChange={(e) => changeState(e)}
        ></input>
      </div>
      <button
        type="submit"
        className="border-solid border-2 border-gray-200 rounded px-4 py-1 mt-12 hover:bg-gray-200 transition-all mb-12"
      >
        가입하기
      </button>
    </form>
  );
};

export default SignUpUser;
