import KAKAO_IMG_WIDE from "../assets/sns/kakao_login_medium_wide.png";
import KAKAO_IMG_NARROW from "../assets/sns/kakao_login_medium_narrow.png";

const Login = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-12">LOGIN</h1>
      <form action="" className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="w-64 sm:w-96 flex justify-between items-center my-2">
            <label>아이디</label>
            <input
              type="text"
              className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-slate-400 placeholder:text-xs indent-2.5 py-1"
              placeholder="아이디를 입력해주세요"
            ></input>
          </div>
          <div className="w-64 sm:w-96 flex justify-between items-center mb-2">
            <label>비밀번호</label>
            <input
              type="password"
              className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-xs indent-2.5 py-1"
              placeholder="비밀번호를 입력해주세요"
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
      <img src={KAKAO_IMG_WIDE} className="cursor-pointer mt-12"></img>
      <div className="flex justify-between items-center w-80">
        <button
          type="button"
          className="border-solid border-2 border-gray-200 rounded px-4 py-1 mt-12 hover:bg-gray-200 transition-all"
        >
          회원가입
        </button>
        <button
          type="button"
          className="border-solid border-2 border-gray-200 rounded px-4 py-1 mt-12 hover:bg-gray-200 transition-all"
        >
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default Login;
