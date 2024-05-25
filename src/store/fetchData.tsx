import { DocumentData, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { UpdateWishListType } from "../@types/WishList";
import { ReviewType, UpdateReviewType } from "../@types/Review";

export const checkEmail = async (email: string) => {
  const condition = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(condition);
  if (querySnapshot.empty) return false;
  else return true;
};

export const fetchAllBusiness = async () => {
  const filteredList: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(db, "companies"));
  querySnapshot.forEach((doc) => {
    filteredList.push(doc.data());
  });
  // console.log(filteredList);

  return filteredList;
};

export const postWishList = async ({ userId, wishList, itemId }: UpdateWishListType) => {
  await updateDoc(doc(db, "users", userId), {
    wish_list: [...wishList, itemId],
  }).catch((error) => console.log(`위시리스트 업데이트에 실패했습니다 : ${error}`));
};
export const deleteWishList = async ({ userId, wishList, itemId }: UpdateWishListType) => {
  await updateDoc(doc(db, "users", userId), {
    wish_list: wishList.filter((id) => id !== itemId),
  }).catch((error) => console.log(`위시리스트 업데이트에 실패했습니다 : ${error}`));
};

export const fetchAllReviews = async () => {
  const ReviewList: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(db, "reviews"));
  querySnapshot.forEach((doc) => {
    ReviewList.push(doc.data());
  });
  // console.log(filteredList);

  return ReviewList;
};

export const postReview = async (reviewMap: ReviewType) => {
  await setDoc(doc(db, "reviews", reviewMap.id), {
    ...reviewMap,
  }).catch((error) => console.log(`리뷰 업데이트에 실패했습니다 : ${error}`));
};
export const deleteDataBaseReview = async (reviewId: string) => {
  await deleteDoc(doc(db, "reviews", reviewId)).catch((error) =>
    console.log(`리뷰 업데이트에 실패했습니다 : ${error}`),
  );
};

export const postBusinessReview = async ({ itemId, reviewList, reviewId }: UpdateReviewType) => {
  await updateDoc(doc(db, "companies", itemId), {
    reviews: [...reviewList, reviewId],
  }).catch((error) => console.log(`리뷰 업데이트에 실패했습니다 : ${error}`));
};
export const deleteBusinessReview = async ({ itemId, reviewList, reviewId }: UpdateReviewType) => {
  await updateDoc(doc(db, "companies", itemId), {
    reviews: reviewList.filter((id) => id !== reviewId),
  }).catch((error) => console.log(`리뷰 업데이트에 실패했습니다 : ${error}`));
};

export const postUserReview = async ({ itemId, reviewList, reviewId }: UpdateReviewType) => {
  await updateDoc(doc(db, "users", itemId), {
    reviews: [...reviewList, reviewId],
  }).catch((error) => console.log(`리뷰 업데이트에 실패했습니다 : ${error}`));
};
export const deleteUserReview = async ({ itemId, reviewList, reviewId }: UpdateReviewType) => {
  await updateDoc(doc(db, "users", itemId), {
    reviews: reviewList.filter((id) => id !== reviewId),
  }).catch((error) => console.log(`리뷰 업데이트에 실패했습니다 : ${error}`));
};
