import { BrowserRouter } from "react-router-dom";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import Router from "./router/router";

function App() {
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
