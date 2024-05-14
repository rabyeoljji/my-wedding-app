const SignUp = (): JSX.Element => {
  return (
    <form action="" className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-12">회원가입</h1>
      <div className="w-80 sm:w-96 flex justify-between items-center mb-2">
        <label>이메일</label>
        <input
          type="email"
          className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-slate-400 placeholder:text-xs indent-2.5 py-1"
          placeholder="mywedding@example.com"
        ></input>
      </div>
      <div className="w-80 sm:w-96 flex justify-between items-center mb-2">
        <label>비밀번호</label>
        <input
          type="password"
          className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-xs indent-2.5 py-1"
          placeholder="(영문,특수문자 포함 6~12자리)"
        ></input>
      </div>
      <div className="w-80 sm:w-96 flex justify-between items-center mb-2">
        <label>비밀번호 확인</label>
        <input
          type="password"
          className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-xs indent-2.5 py-1"
          placeholder="비밀번호를 한 번 더 입력해주세요"
        ></input>
      </div>
      <div className="w-80 sm:w-96 flex justify-between items-center mt-10">
        <label>닉네임</label>
        <input
          type="text"
          className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-xs indent-2.5 py-1"
          placeholder="닉네임을 입력해주세요"
        ></input>
      </div>
      <button
        type="submit"
        className="border-solid border-2 border-gray-200 rounded px-4 py-1 mt-12 hover:bg-gray-200 transition-all"
      >
        가입하기
      </button>
    </form>
  );
};

export default SignUp;
