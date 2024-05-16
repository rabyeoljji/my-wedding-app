import { BrowserRouter } from "react-router-dom";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import Router from "./router/router";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { fetchUniqueData, userAtom } from "./store/userInfo";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const setUserInfo = useSetAtom(userAtom);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userInfo = await fetchUniqueData("users", user.uid);
        if (userInfo) {
          setUserInfo({
            uid: userInfo.uid,
            nickname: userInfo.username,
            wishList: userInfo.wish_list,
            reviews: userInfo.reviews,
          });
        }
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <section className="main h-screen min-h-96 flex justify-center items-center">
        <Router />
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
