import { authState } from "~/frontend/stores/auth";
import app from "./firebase";
import { signInWithGoogle } from "./google";
import { signInWithKakao, initKakao } from "./kakao";

const signOut = async () => {
  try {
    authState.set({ status: "loading" });
    await app.auth().signOut();
    authState.set({ status: "out" });
  } catch (error) {
    console.log(error);
  }
};

export { signInWithGoogle, signInWithKakao, initKakao, signOut };
