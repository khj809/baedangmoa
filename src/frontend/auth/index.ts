import { authState } from "~/frontend/stores/auth";
import app from "./firebase";
import { signInWithGoogle } from "./google";
import { signInWithKakao, initKakao } from "./kakao";

const signOut = async () => {
  try {
    authState.set({ status: "out" });
    await app.auth().signOut();
  } catch (error) {
    console.log(error);
  }
};

export { signInWithGoogle, signInWithKakao, initKakao, signOut };
