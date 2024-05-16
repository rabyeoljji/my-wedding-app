import KAKAO_IMG_WIDE from "../../assets/sns/kakao_login_medium_wide.png";

const KakaoLoginBtn = (): JSX.Element => {
  const KAKAO_API_KEY = import.meta.env.VITE_APP_KAKAO_API_KEY;
  const KAKAO_REDIRECT_URI = `${import.meta.env.VITE_APP_HOST_URL}/kakaoAuth`;
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  return (
    <>
      <img src={KAKAO_IMG_WIDE} className="cursor-pointer mt-2 w-72" onClick={() => handleKakaoLogin()}></img>
    </>
  );
};

export default KakaoLoginBtn;
