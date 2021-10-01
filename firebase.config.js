import * as firebase from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbNXfJM6cuu4bPeTOt34wntt5FIiKPmMo",
  authDomain: "whatsapp-9c91c.firebaseapp.com",
  projectId: "whatsapp-9c91c",
  storageBucket: "whatsapp-9c91c.appspot.com",
  messagingSenderId: "522890536223",
  appId: "1:522890536223:web:31d0127b08614dad453c2a",
  measurementId: "G-E2D7BFN9Z5",
};

const app = !firebase.getApps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.getApp();
const db = getFirestore(app);
const usersDataBase = collection(db, "users");
const chatsDataBase = collection(db, "chats");
const authentication = getAuth(app);
const provider = new GoogleAuthProvider();
const popPup = () =>
  signInWithPopup(authentication, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("que carajo es esto", credential);
      const token = credential.accessToken;
      const user = result.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
export {
  authentication,
  provider,
  popPup,
  db,
  app,
  usersDataBase,
  chatsDataBase,
};
