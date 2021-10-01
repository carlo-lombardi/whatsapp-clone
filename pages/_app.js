import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { authentication, usersDataBase } from "../firebase.config";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { setDoc, doc, FieldValue } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(authentication);
  useEffect(() => {
    if (user) {
      setDoc(
        doc(usersDataBase, user.uid),
        {
          email: user.email,
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  return (
    <>
      {loading ? <Loading /> : !user ? <Login /> : <Component {...pageProps} />}
    </>
  );
}
export default MyApp;
