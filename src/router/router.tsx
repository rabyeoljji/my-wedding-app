import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Error from "../views/Error";
import Index from "../views/Index";
import SignUp from "../views/SignUp";
import Login from "../views/Login";
import UserProfileView from "../views/UserProfileView";
import MyReviewsView from "../views/MyReviewsView";
import PasswordResetView from "../views/PasswordResetView";
import ProcessKakaoToken from "../auth/socialLogin/ProcessKakaoToken";
import BusinessItemView from "../views/BusinessItemView";
import ReviewEditorView from "../views/ReviewEditorView";
import ReviewContentView from "../views/ReviewContentView";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Index />} />
      <Route path="/:pageGroup/:page/:category/:geo/:budget/:keyword?" element={<Index />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password-reset" element={<PasswordResetView />} />
      <Route path="/kakaoAuth" element={<ProcessKakaoToken />} />
      <Route path="/profile/:category" element={<UserProfileView />} />
      <Route path="/my-reviews" element={<MyReviewsView />} />
      <Route path="/my-reviews/:page" element={<MyReviewsView />} />
      <Route path="/business/:id" element={<BusinessItemView />} />
      <Route path="/business/:id/:page" element={<BusinessItemView />} />
      <Route path="/review-edit-page/:id" element={<ReviewEditorView />} />
      <Route path="/review-page/:id" element={<ReviewContentView />} />
    </Routes>
  );
};

export default memo(Router);
