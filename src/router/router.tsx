import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Error from "../views/Error";
import Index from "../views/Index";
import SignUp from "../views/SignUp";
import Login from "../views/Login";
import Profile from "../views/Profile";
import MyReviews from "../views/MyReviews";
import WishList from "../views/WishList";
import PasswordResetPage from "../views/PasswordResetPage";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Index />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password-reset" element={<PasswordResetPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-reviews" element={<MyReviews />} />
      <Route path="/wishlist" element={<WishList />} />
    </Routes>
  );
};

export default memo(Router);
