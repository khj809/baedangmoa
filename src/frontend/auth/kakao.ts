import "firebase/functions";
import app from "./firebase";
import { authState } from "~/frontend/stores/auth";

declare global {
  interface Window {
    Kakao: any;
  }
}
const kakaoAuth = app.functions("asia-northeast3").httpsCallable("kakaoAuth");

const kakaoAppKey = "89668827f4d1d526ec90c4373f2edd5b";
export const initKakao = () => {
  window.Kakao.init(kakaoAppKey);
};

export const signInWithKakao = () => {
  window.Kakao.Auth.login({
    success: (authObj: any) => {
      const token = authObj.access_token;
      authState.set({ status: "authenticating" });
      kakaoAuth({ token })
        .then(async (res) => {
          const firebaseToken = res.data.firebase_token;
          await app.auth().signInWithCustomToken(firebaseToken);
        })
        .catch((err) => {
          console.error(err);
          authState.set({ status: "out" });
        });
    },
    fail: (err: any) => {
      console.error(err);
      alert(JSON.stringify(err));
    },
  });
};
