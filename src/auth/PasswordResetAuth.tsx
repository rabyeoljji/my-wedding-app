import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export const sendEmail = async (email: string) => {
  return await sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      return true;
    })
    .catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`${errorCode}: ${errorMessage}`);
      return false;
    });
};
