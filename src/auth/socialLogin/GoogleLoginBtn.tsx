import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";

const GoogleLoginBtn = (): JSX.Element => {
  const navigate = useNavigate()

  const clickGoogleLogin = async () => {
    try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      navigate("/");
    }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <>
      <button
        className="px-10 sm:px-16 py-2 mt-8 border-solid flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 font-sans"
        onClick={() => {
          clickGoogleLogin();
          // navigate("/");
        }}
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </>
  );
};

export default GoogleLoginBtn;
