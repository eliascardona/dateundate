// import React, { useEffect, useRef, useState } from "react";
// import { auth, firestore } from "../../firebase/base";
// import { onAuthStateChanged } from "firebase/auth";
// import {
//   arrayUnion,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   setDoc,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import styles from "../../styles/forms.module.css";
// import { useRouter } from "next/router";
// import { currTime, nm } from "../../utils/utils";
// import { Notification } from "../modals/Notification"
// import { prepareConfession } from "../../utils/prepareConfession";
// import { confessCrush } from "../../utils/confessCrush";
// import { getCurrUserDoc } from "../../utils/getCurrUserDoc";

// export const MatchFormTwo = () => {
//   const router = useRouter();
//   //varibles current user
//   const [userEmail, setUserEmail] = useState();
//   const [owner, setOwner] = useState();
//   const [matchOwner, setMatchOwner] = useState();
//   // variables auxiliares 1
//   const [users, setUsers] = useState([])
//   const [openNotif, setOpenNotif] = useState(false);
//   // variables auxiliares 2
//   const [mainSubject, setMainSubject] = useState("");
//   const [notTo, setNotTo] = useState("")
//   const [err, setErr] = useState("");
  
//   useEffect(() => {
//     const checkUserEmail = () => {
//       onAuthStateChanged(auth, (user) => {
//         if (user) setUserEmail(user.email);
//       });
//     };
//     checkUserEmail();
//   }, []);

//   useEffect(() => {
//     const getData = async () => {
//       const data = []
//       const collRef = collection(firestore, "users")
//       const coll = await getDocs(collRef)
//       let postDocs = coll.docs
//       postDocs.forEach(info => {
//         data.push(info.data())
//       })
//       setUsers(data)
//     }
//     getData()
//   }, [])

//   useEffect(() => {
//     const getOwner = async () => {
//       const docRef = doc(firestore, "users", userEmail);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setOwner(docSnap.data());
//       } else {
//         console.log("No user");
//       }
//     };
//     userEmail && getOwner();
//   }, [userEmail]);
  
//   useEffect(() => {
//     const getMatchOwner = async () => {
//       const docRef = doc(firestore, "users", userEmail);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setMatchOwner(docSnap.data());
//       } else {
//         console.log("No user");
//       }
//     };
//     userEmail && getMatchOwner();
//   }, [userEmail]);


//   //*************************************************************************
//   //
//   //  CONSULTAS
//   //
//   let objetoDestinatario = async function() {       
//     let objDestinatario = {};
//     const usersRef = collection(firestore, "users");
//     const destinatario = query(usersRef, where("username", "==", mainSubject));
//     const consultaDesatinatario = await getDocs(destinatario);
//     objDestinatario = consultaDesatinatario.docs[0] ? consultaDesatinatario.docs[0].data() : undefined;
//     return objDestinatario
//   }
//   let objetoRemitente = async function() {
//     let objRemitente = {};
//     const usersRef = collection(firestore, "users");
//     const remitente = query(usersRef, where("username", "==", owner.username))
//     const consultaRemitente = await getDocs(remitente);
//     objRemitente = consultaRemitente.docs[0] ? consultaRemitente.docs[0].data() : undefined;
//     return objRemitente
//   }
//   let likesDelRemitente = async function() {
//     let objetoRemitente = {};
//     let liksDelRemitente = [];
//     const usersRef = collection(firestore, "users");
//     const remitente = query(usersRef, where("username", "==", owner.username))
//     const consultaRemitente = await getDocs(remitente);
//     objetoRemitente = consultaRemitente.docs[0] ? consultaRemitente.docs[0].data() : undefined;
//     liksDelRemitente = objetoRemitente.likes
//     return liksDelRemitente    
//   }
//   //
//   //  CONSULTAS
//   //
//   //*************************************************************************
  
//   return (
//     <div>
//       <h2>Escribe el nombre de usuario de tu crush</h2>
//       <input
//         type="text"
//         placeholder="@username"
//         className={styles.input}
//         onChange={(e) => {
//           e.preventDefault()
//           setMainSubject(e.target.value)
//         }}
//         onBlur={(e) => {
//           e.preventDefault()
//           prepareConfession(owner, mainSubject, setNotTo, setOpenNotif, likesDelRemitente, objetoRemitente, objetoDestinatario)
//         }}
//       />
//       <button
//         type="button"
//         onClick={() => {console.log("la")}}
//         disabled={!owner}
//         className={styles.formBtn}
//       >
//         enviar
//       </button>
//       <br />
//       <p className={styles.alertLabel}>{err}</p>
//       <br />
//       <h3>Lista de usuarios registrados: </h3>
//       <div className={styles.scrollable}>
//         {
//           users.map(usr => {
//             return (
//               <span style={{display:'block'}} key={usr.username}>
//                 {usr.username}
//               </span>
//             )
//           })
//         }
//       </div>
//       {
//         openNotif &&
//         <Notification 
//           openNotif={openNotif} 
//           setOpenNotif={setOpenNotif} 
//           notTo={notTo}
//           title="FELICIDADES"
//         />
//       }
//     </div>
//   )
// }