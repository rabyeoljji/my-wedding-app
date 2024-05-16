import { configInfo } from "./../../config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { TokenResponse } from "../@types/Token";
import axios from "axios";
import { KakaoUser } from "../@types/KakaoUser";

export const firebaseApp = initializeApp(configInfo.firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export const getToken = async (code: string): Promise<TokenResponse> => {
  const body = {
    grant_type: "authorization_code",
    client_id: import.meta.env.VITE_APP_KAKAO_API_KEY || "",
    redirect_uri: import.meta.env.VITE_APP_KAKAO_REDIRECT_URI || "",
    code,
  };

  const res = await axios.post("https://kauth.kakao.com/oauth/token", new URLSearchParams(body));
  return res.data;
};

export const getKakaoUser = async (token: string): Promise<KakaoUser> => {
  const res = await axios.get("https://kapi.kakao.com/v2/user/me", { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
