import { useNavigate, useSearchParams } from "react-router-dom";
import { getKakaoUser, getToken } from "../../firebase";
import { setUser } from "../SignUpAuth";
import { useLogin } from "../LoginOutAuth";

const ProcessKakaoToken = (): JSX.Element => {
  const navigate = useNavigate();
  const login = useLogin(true);
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  if (code) {
    getToken(code)
      .then(async (response) => {
        const token = response.access_token;
        const kakaoUser = await getKakaoUser(token);
        const { kakao_account } = kakaoUser;

        const password = `${kakaoUser.id}`;
        const email = kakao_account?.email;
        const nickname = kakao_account?.profile?.nickname;

        if (email) {
          navigate("/");
          login({ email, password })
            .then((uid) => {
              if (uid === "" && email && nickname) {
                setUser({ email, password, nickname });
                alert("카카오 계정으로 로그인되었습니다.");
              } else if (!email || !nickname) {
                console.log("error : email과 nickname이 확인 불가능합니다");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return <></>;
};

export default ProcessKakaoToken;
