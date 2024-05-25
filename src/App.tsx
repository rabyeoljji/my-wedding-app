import { BrowserRouter } from "react-router-dom";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import Router from "./router/router";
import { useEffect, useMemo } from "react";
import { useLoginStateUpdate } from "./hooks/useLoginStateUpdate";
import { fetchAllBusiness, fetchAllReviews } from "./store/fetchData";
import { useSetAtom } from "jotai";
import { businessAtom } from "./store/company";
import { reviewListAtom } from "./store/review";

function App() {
  const allBusinessListPromise = useMemo(() => fetchAllBusiness(), []);
  const allReviewListPromise = useMemo(() => fetchAllReviews(), []);
  const setBusinessList = useSetAtom(businessAtom);
  const setReviewList = useSetAtom(reviewListAtom);
  const loginStateUpdate = useLoginStateUpdate();

  useEffect(() => {
    loginStateUpdate();
  }, []);

  useEffect(() => {
    allBusinessListPromise.then((dataList) => {
      setBusinessList(dataList);
    });
    allReviewListPromise.then((dataList) => {
      setReviewList(dataList);
    });
  }, [allBusinessListPromise, allReviewListPromise]);

  return (
    <BrowserRouter>
      <Nav />
      <section className="main min-h-96 flex flex-col justify-center items-center">
        <Router />
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
