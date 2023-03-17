// import { auth, firestore } from "../firebase/base"
// import { onAuthStateChanged } from "firebase/auth";
// import {
//   doc,
//   getDoc,
// } from "firebase/firestore"

// const getCurrUserDoc = async ({ collectionParam }) => {
//   const currEmail = ""
//   currEmail = function() {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         return user.email
//       }
//     });
//   }
  
//   const docRef = doc(firestore, collectionParam, currEmail)

//   const docSnap = await getDoc(docRef)
//   if (docSnap.exists()) {
//     return docSnap.data()
//   } else {
//     console.log("No user")
//   }
// }

// export { getCurrUserDoc }