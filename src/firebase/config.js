import { initializeApp, getApps } from "firebase/app";

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

export default firebase_app;