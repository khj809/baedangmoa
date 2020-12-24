import firebase from "firebase/app";
import app from "./firebase";

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await app.auth().signInWithPopup(provider);
  } catch (error) {
    console.log(error);
  }
};
