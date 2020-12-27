import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/analytics";
import { authState } from "~/frontend/stores/auth";

let app: firebase.app.App;
if (!firebase.apps.length) {
  app = firebase.initializeApp(
    {
      apiKey: "AIzaSyDc8uyY1pV5MjfEQmeN-eztaidgCUDXC7k",
      authDomain: "baedangmoa.firebaseapp.com",
      databaseURL: "https://baedangmoa-default-rtdb.firebaseio.com",
      projectId: "baedangmoa",
      storageBucket: "baedangmoa.appspot.com",
      messagingSenderId: "503556012588",
      appId: "1:503556012588:web:cbf3c29ee2aa9c6a226f89",
      measurementId: "G-QX9GG4Y79B",
    },
    "baedangmoa"
  );
  // uncomment this when using emulator
  // app.functions().useEmulator("localhost", 5002);
  app.analytics();
} else {
  app = firebase.apps[0];
}

app.auth().onAuthStateChanged(async (user) => {
  if (user) {
    const token = await user.getIdToken();
    const idTokenResult = await user.getIdTokenResult();
    const hasuraClaim = idTokenResult.claims["https://hasura.io/jwt/claims"];

    if (hasuraClaim) {
      authState.set({
        status: "in",
        user,
        token,
      });
    } else {
      const metadataRef = firebase.database().ref("metadata/" + user.uid + "/refreshTime");
      metadataRef.on("value", async (data) => {
        if (!data.exists) return;
        const token = await user.getIdToken(true);
        authState.set({ status: "in", user, token });
      });
    }
  } else {
    authState.set({ status: "out" });
  }
});

export default app;
