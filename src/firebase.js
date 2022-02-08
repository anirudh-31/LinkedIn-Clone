import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaMnl-DVjtmiPrDeYlT-WBRUnyrL_JB0E",
  authDomain: "linkedin-clone-199d3.firebaseapp.com",
  projectId: "linkedin-clone-199d3",
  storageBucket: "linkedin-clone-199d3.appspot.com",
  messagingSenderId: "404802282393",
  appId: "1:404802282393:web:86d76752a6c33f3df16908",
  measurementId: "G-V6G2W97QX5",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { db, auth, provider, storage };
