import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCn0EZnyOdhZafBN4ncIEej9YSP34k7ZTI",
  authDomain: "hurricanex-706cb.firebaseapp.com",
  projectId: "hurricanex-706cb",
  storageBucket: "hurricanex-706cb.appspot.com",
  messagingSenderId: "778908870113",
  appId: "1:778908870113:web:947515e46f42b81e8b1ea0",
  measurementId: "G-EYPEZ0ZCT3"
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
let auth = getAuth();

export default auth;

export const db = getFirestore()

auth.onAuthStateChanged(async user => {
  if (user)
  {
    try {
      const docRef = await addDoc(collection(db, "Users"), {
        uid: user.uid
      });
    }
    catch (e) {

    }
  }
})