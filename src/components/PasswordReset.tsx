import { FormEvent } from "react";
import { sendEmail } from "../auth/PasswordResetAuth";
import { checkEmail } from "../store/fetchData";
import { useNavigate } from "react-router-dom";

const PasswordReset = (): JSX.Element => {
  const navigate = useNavigate();

  const submitEmail = async (e: FormEvent) => {
    e.preventDefault();
    const targetForm = e.target as HTMLFormElement;
    const targetInput = targetForm.querySelector("input");

    if (targetInput && targetInput.value) {
      const email = targetInput.value;
      checkEmail(email)
        .then(async (value) => {
          if (value) {
            const result = sendEmail(targetInput.value);

            if ((await result).valueOf()) {
              alert("메일을 성공적으로 전송하였습니다.");
              navigate("/login");
            }
          } else {
            alert(`회원으로 등록되지 않은 이메일입니다.
가입 시 작성한 이메일을 입력해주세요.
소셜로그인 계정일 경우 소셜 로그인을 이용해주시기 바랍니다.`);
            return;
          }
        })
        .catch((error) => console.log(error));
    } else {
      alert("가입 시 작성한 이메일을 입력해주세요");
    }
  };

  return (
    <div className="h-full mt-28">
      <form className="flex flex-col justify-center items-center" onSubmit={(e) => submitEmail(e)}>
        <div className="flex flex-col items-center mb-10">
          <p>가입 시 입력한 이메일을 입력해주시면,</p>
          <p>비밀번호 재설정 링크를 메일로 보내드립니다.</p>
        </div>
        <div className="w-64 sm:w-96 flex justify-between items-center my-4 mb-16">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-slate-400 placeholder:text-xs indent-2.5 py-1"
            placeholder="mywedding@example.com"
          ></input>
        </div>
        <button
          type="submit"
          className="bg-indigo-100 py-2 px-4 flex justify-center items-center rounded hover:bg-indigo-200 mb-28"
        >
          보내기
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
