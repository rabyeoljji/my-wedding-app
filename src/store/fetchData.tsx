import { DocumentData, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UpdateWishListType } from "../@types/WishList";

export const fetchAllBusiness = async () => {
  const filteredList: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(db, "companies"));
  querySnapshot.forEach((doc) => {
    filteredList.push(doc.data());
  });
  console.log(filteredList);

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
