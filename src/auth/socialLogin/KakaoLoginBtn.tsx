import KAKAO_IMG_WIDE from "../../assets/sns/kakao_login_medium_wide.png";

const KakaoLoginBtn = (): JSX.Element => {
  const KAKAO_API_KEY = import.meta.env.VITE_APP_KAKAO_API_KEY;
  const KAKAO_REDIRECT_URI = `${import.meta.env.NODE_ENV === "development" ? import.meta.env.VITE_APP_HOST_URL : "https://my-wedding-app.vercel.app"}/kakaoAuth`;
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  return (
    <>
      <img
        src={KAKAO_IMG_WIDE}
        className="cursor-pointer mt-2 w-[15.5rem] sm:w-[18.5rem] h-12 border-solid border-4 border-yellow-300 rounded-xl hover:border-yellow-500 transition-all"
        onClick={() => handleKakaoLogin()}
      ></img>
    </>
  );
};

export default KakaoLoginBtn;
