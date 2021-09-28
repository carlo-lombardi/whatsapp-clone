import * as firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCbNXfJM6cuu4bPeTOt34wntt5FIiKPmMo",
  authDomain: "whatsapp-9c91c.firebaseapp.com",
  projectId: "whatsapp-9c91c",
  storageBucket: "whatsapp-9c91c.appspot.com",
  messagingSenderId: "522890536223",
  appId: "1:522890536223:web:31d0127b08614dad453c2a",
  measurementId: "G-E2D7BFN9Z5",
};

const app = firebase.initializeApp(firebaseConfig);
// console.log(typeof app.firestore);
// const db = app.firestore();

// const auth = app.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// export { auth, provider };
