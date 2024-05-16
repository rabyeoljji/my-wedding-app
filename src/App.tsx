import { BrowserRouter } from "react-router-dom";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import Router from "./router/router";
import { useEffect } from "react";
import { useLoginStateUpdate } from "./hooks/useLoginStateUpdate";

function App() {
  const loginStateUpdate = useLoginStateUpdate();

  useEffect(() => {
    loginStateUpdate();
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
