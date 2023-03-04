import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAO9duIZSc01GpHaHo4-PO5Ja3v6G2QkEQ",
  authDomain: "elias-dating-app.firebaseapp.com",
  projectId: "elias-dating-app",
  storageBucket: "elias-dating-app.appspot.com",
  messagingSenderId: "571187796785",
  appId: "1:571187796785:web:005a2c413c91da79052e10"
})

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const firebaseFunctions = getFunctions(firebaseApp);