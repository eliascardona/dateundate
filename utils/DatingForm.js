// import React, { useEffect, useRef, useState } from "react";
// import { auth, firestore } from "../firebase/base";
// import { onAuthStateChanged } from "firebase/auth";
// import {
//     arrayUnion,
//     collection,
//     doc,
//     getDoc,
//     getDocs,
//     query,
//     setDoc,
//     updateDoc,
//     where
// } from "firebase/firestore";
// import styles from "../styles/forms.module.css";
// import { nm } from "../utils/utils";
// import { useRouter } from "next/router";

// export const DatingForm = () => {
//     const [userEmail, setUserEmail] = useState()
//     const [owner, setOwner] = useState()
//     const [err, setErr] = useState("")
//     const usernameRef = useRef()
//     const router = useRouter()

//     useEffect(() => {
//         const checkUserEmail = () => {
//             onAuthStateChanged(auth, (user) => {
//                 if (user) 
//                     setUserEmail(user.email);            
//             });
//         };
//         checkUserEmail();
//     }, []);
    
//     useEffect(() => {
//         const getOwner = async () => {
//             const docRef = doc(firestore, "users", userEmail)
//             const docSnap = await getDoc(docRef);
//             if (docSnap.exists()) {
//                 setOwner(docSnap.data())
//             } else {
//                 console.log("No user")
//             }
//         };
//         userEmail && getOwner();
//     }, [userEmail]);

//     // let userName = usernameRef.current.value
//     const [mainSubject, setMainSubject] = useState("")
    
//     const confessCrush = async () => {
//         setErr("") //Si ya hay un mensaje de error, lo borra.
//         if(mainSubject[0] != "@") { //Si el usuario no ingreso el "@" lo ingresamos nosotros.
//             mainSubject = `@${mainSubject}`
//         }
//         const usersRef = collection(firestore, "users")
//         const q = query(usersRef, where("username", "==", mainSubject))
//         const querySnapshot = await getDocs(q)
//         let target = {}
//         target = querySnapshot.docs[0] ? querySnapshot.docs[0].data() : undefined
//         console.log(target)
//         if(target) {
//             let docID = `confesion${nm}`
//             await updateDoc(doc(firestore, "users", target.email), {
//                 likes: arrayUnion(userEmail)
//             })
//             await setDoc(doc(firestore, "confesiones", docID), {
//                 de: userEmail,
//                 deUsername: owner.username,
//                 para: target.email,
//                 paraUsername: mainSubject,
//                 cardID: docID
//             })
//             router.reload()
//         } else {
//             setErr("El usuario ingresado no existe, vuelve a intentar.")
//         }
//     }
    
//     return (
//         <div>
//             <h3>Escribe el username de la persona que te gusta</h3>
//             <input
//                 type="text"
//                 ref={usernameRef}
//                 placeholder="@username"
//                 className={styles.input}
//                 onChange={(e)=>{
//                     e.preventDefault()
//                     setMainSubject(e.target.value)
//                 }}
//             />
//             <button
//                 type="button"
//                 onClick={confessCrush}
//                 disabled={!owner}
//                 className={styles.formBtn}
//             >
//                 enviar
//             </button>
//             <br/>
//             <p className={styles.alertLabel}>{err}</p>
//         </div>
//     )
// }