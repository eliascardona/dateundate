// import { useEffect, useRef, useState } from "react"
// import { auth, firestore } from "../firebase/base"
// import {
//   arrayUnion,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   setDoc,
//   updateDoc,
//   where
// } from "firebase/firestore"
// import { onAuthStateChanged } from "firebase/auth"
// import { Button } from "../components/Button"
// import { Card } from "../components/Card"
// import { PageHeader } from "../components/PageHeader"
// import { Modal } from "../components/Modal"
// import { Notification } from "../components/Notification"
// import { currTime, nm } from "../utils/utils"
// import useCompare from "../hooks/useCompare"

// function secretPage() {
//   const [userEmail, setUserEmail] = useState("")
//   const [posts, setPosts] = useState([])
//   const [matches, setMatches] = useState([])
//   const [users, setUsers] = useState([])
//   const [openModal, setOpenModal] = useState(false)
//   const [openNotif, setOpenNotif] = useState(false)
  
//   useEffect(() => {
//     const checkUserEmail = () => {
//       onAuthStateChanged(auth, (user) => {
//         if (user) 
//           setUserEmail(user.email)
//         })
//     }
//     checkUserEmail()
//   }, [])
  
//   useEffect(() => {
//     const getUsers = async () => {
//       const data = []
//       const collRef = collection(firestore, "users")
//       const coll = await getDocs(collRef)
//       let usersDocs = coll.docs
//       usersDocs.forEach(info => {
//         data.push(info.data())
//       }) 
//       setUsers(data)
//     }
//     getUsers()
//   }, [])
  
//   useEffect(() => {
//     const getPosts = async () => {
//       const data = []
//       const collRef = collection(firestore, "confesiones")
//       const coll = await getDocs(collRef)
//       let postDocs = coll.docs
//       postDocs.forEach(info => {
//         data.push(info.data())
//       })
//       setPosts(data)
//     }
//     getPosts()
//   }, [])
  
//   //****************************************************************
//   //
//   //  INICIO DE LA FUNCION DE MATCH
//   //
  
//   async function checkMatch (destinatarioParam, remitenteParam) {
//     if (destinatarioParam === userEmail) {
//       setOpenNotif(true)
//       const usersRef = doc(firestore, "matches", destinatarioParam)
//       await setDoc(usersRef, {
//         horaDelMatch: currTime,
//         recibioElMatch: destinatarioParam,
//         matches: arrayUnion(remitenteParam)
//       })
//     }
//   }

//   // let dbRef = doc(firestore, "users", userEmail)
//   // let snap = getDoc(dbRef)
//   // if (snap.exists()) {
//   //   let userLikes = snap.data().likes
//   // }

//   // let dbcRef = collection(firestore, "users")
//   // let currUserLikesArray = query(
//   //   dbcRef,
//   //   where(
//   //     "likes",
//   //     "array-contains-any",
//   //     userLikes
//   //   )
//   // )
  
//   useEffect(() => {
//     // let auxArr3 = []
//     // posts.forEach(post => {
//     //   users.forEach((usr, j) => {
//     //     if (usr[j].likes.include(post.de)) {
//     //       auxArr3.push(post.de)
//     //       checkMatch()
//     //     }
//     //   })
//     // })
//     // return auxArr3
//   }, [users])
  
//   return (
//     <>
//       <PageHeader />
//       <div style={{paddingTop:'15px', paddingLeft:'23px'}}>
//         <h1>ADAM LIKES YOU 🤑</h1>
//         {
//           posts.map((post, i, arr) => {
//             const sender = users?.find((user) => user.email == post.de)
//             const receiver = users?.find((user) => user.email == post.para)
//             return (
//               <>
//                 <Card 
//                   username={sender.username}
//                   para={receiver.username} 
//                   cardID={post.cardID} 
//                   key={post.cardID} 
//                 />
//               </>
//             )
//           })
//         }
//         <Button clickAction={()=>{setOpenModal(true)}} />
//         {
//           openModal &&
//           <Modal 
//             openModal={openModal} setOpenModal={setOpenModal} title="CONFIESA TU LIGUE" />
//         }
//         {
//           openNotif &&
//           <Notification 
//             openNotif={openNotif} 
//             setOpenNotif={setOpenNotif} 
//             notTo="user"
//             title="FELICIDADES"
//           />
//         }
//       </div>
//     </>
//   )
// }

// export default secretPage