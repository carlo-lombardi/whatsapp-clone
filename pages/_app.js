import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, usersDataBase } from "../firebase.config";
import Login from "./login";
import Loading from "../components/Loading";
import firebase from "firebase";
import { useEffect } from "react";
// import { setDoc, doc, FieldValue } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
      });
    }
  }, [user]);

  return (
    <>
      {loading ? <Loading /> : !user ? <Login /> : <Component {...pageProps} />}
    </>
  );
}
export default MyApp;
