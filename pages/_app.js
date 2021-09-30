import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { authentication, collected, db, document } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { doc, collection } from "firebase/firestore";
import { set } from "firebase/database";
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(authentication);
  // console.log(user);
  useEffect(() => {
    if (user) {
      const collect = collection(db, user.uid);
      const documen = doc(user.uid);
      const newData = set(db, {
        email: user.email,
      });
      console.log(newData);
    }
  }, [user]);
  return (
    <>
      {loading ? <Loading /> : !user ? <Login /> : <Component {...pageProps} />}
    </>
  );
}
export default MyApp;
