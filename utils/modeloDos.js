// import { useEffect, useRef, useState } from "react"
// import { auth, firestore } from "../firebase/base"
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   onSnapshot,
//   query,
//   setDoc,
//   where
// } from "firebase/firestore"
// import { onAuthStateChanged } from "firebase/auth"
// import { Button } from "../components/Button"
// import { Card } from "../components/Card"
// import { PageHeader } from "../components/PageHeader"
// import { Modal } from "../components/Modal"
// import { Notification } from "../components/Notification"
// import { currTime, nm } from "../utils/utils"
// import { SwipePass } from "../components/SwipePass"

// function modeloDos() {
//   const [userEmail, setUserEmail] = useState("")
//   const [users, setUsers] = useState([])
//   const [posts, setPosts] = useState([])
  
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
//       const users = []
//       const usersRef = collection(firestore, "users")
//       const usersQuery = await getDocs(usersRef)
//       usersQuery.forEach((user) => {
//         users.push(user.data())
//       }) 
//       setUsers(users)
//     }
//     getUsers()
//   }, [])
  
//   useEffect(() => {
//     const getUsers = async () => {
//       const users = []
//       const usersRef = collection(firestore, "users")
//       const usersQuery = await getDocs(usersRef)
//       usersQuery.forEach((user) => {
//         users.push(user.data())
//       }) 
//       setUsers(users)
//     }
//     getUsers()
//   }, [])

//   const [profiles, setProfiles] = useState([])
//   useEffect(() => {
//     let unsub
//     const fetchCards = () => {
//       const passes = getDocs(collection(firestore, "users", userEmail, "passes"))
//       .then(snap => snap.docs.map(doc => doc.id))
//       const swipes = getDocs(collection(firestore, "users", userEmail, "passes"))
//       .then(snap => snap.docs.map(doc => doc.id))

//       const passedUID = passes.length > 0 ? passes : ["tests"]
//       const swipedUID = swipes.length > 0 ? swipes : ["tests"]
      
//       unsub = onSnapshot(
//         query(
//           collection(firestore, "users"),
//           where("id", "not-in", [...passedUID, ...swipedUID ])
//         ),
//         snap => {
//           setProfiles(
//             snap.docs
//             .filter(doc => doc.id != userEmail)
//             .map((doc) => doc.data())
//           )
//         }
//       )
//     }   
//     fetchCards()
//     return unsub
//   }, [])

//   const swipeFunc = () => {
    
//   }

//   const passFunc = () => {

//   }
  
//   return (
//     <>
//       <PageHeader />
//       <div style={{paddingTop:'15px', paddingLeft:'23px'}}>
//         <h1>ADAM LIKES YOU 🤑</h1>
//         {
//           posts.map(post => {
//             return (
//               <SwipePass swipe={swipeFunc} pass={passFunc} />
//             )
//           })
//         }
//       </div>
//     </>
//   )
// }

// export default modeloDos