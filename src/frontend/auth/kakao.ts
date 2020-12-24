import "firebase/functions";
import app from "./firebase";

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
    success: (authObj) => {
      const token = authObj.access_token;
      kakaoAuth({ token }).then((res) => {
        const firebaseToken = res.data.firebase_token;
        app.auth().signInWithCustomToken(firebaseToken);
      });
    },
    fail: (err) => {
      console.error(err);
      alert(JSON.stringify(err));
    },
  });
};
