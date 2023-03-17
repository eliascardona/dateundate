// import { useEffect, useRef, useState } from "react"
// import { auth, firestore } from "../firebase/base"
// import {
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

// function modeloTres() {
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

//   useEffect(() => {
//     const getMatches = async () => {
//       const data = []
//       const collRef = collection(firestore, "macthes")
//       const coll = await getDocs(collRef)
//       let matchesDocs = coll.docs
//       matchesDocs.forEach(info => {
//         data.push(info.data())
//       })
//       setMatches(data)
//     }
//     getMatches()
//   }, [])
  
//   //****************************************************************
//   //
//   //  INICIO DE LA PRIMERA FUNCION DE MATCH
//   //
  
//   let auxArr1 = []
//   let auxArr2 = []
//   users.forEach(itm => auxArr1.push(itm))
//   users.forEach(itm => auxArr2.push(itm))
  
//   //func
//   const [matchArr, setMatchArr] = useState([])
//   async function settingMatch () {
//     let likesArray = []
//     let innerAuxArray = []

//     auxArr1.forEach((itm, i, arr) => {

//       auxArr2.forEach(async (itmj, j, arrj) => {
//         likesArray = itmj.likes
//         console.log(likesArray)
        
//         if (likesArray.includes(userEmail)) {
//           innerAuxArray.push(`match-de-${itm.username}-y-${itmj.username}`)

//           const docRef = doc(firestore, "matches", userEmail)
//           await setDoc(docRef, {
//             diridoA: itm.email,
//             diridoB: itmj.email,
//             usernameA: itm.username,
//             usernameB: itmj.username,
//             hora: currTime
//           })

//           setMatchArr(innerAuxArray)
//         }

//       })
//     })
//     console.log(matchArr)
//   }
//   settingMatch()
  
//   //****************************************************************
//   //
//   //  INICIO DE LA SEGUNDA FUNCION DE MATCH
//   //
//   let auxArr3 = []
//   let auxArr4 = []
//   matchArr.forEach(itm => auxArr1.push(itm))
//   matchArr.forEach(itm => auxArr2.push(itm))
  
//   const [dirido, setDirido] = useState("")
//   async function findMatch () {
//     let auxDirigido = ""
//     auxArr3.forEach((itm, i, arr) => {

//       auxArr4.forEach(async (itmj, j, arrj) => {
//         auxDirigido = itmj.diridoA

//         if (auxArr3.includes(auxDirigido)) {

//           setDirido(itmj.diridoA)
//           // const docRef = doc(firestore, "matches", dirido)
//           // await updateDoc(docRef, {
//           //   xData: "data"
//           // })
//         }

//       })
//     })
//   }
//   findMatch()
  
//   useEffect(() => {
//     console.log(matchArr)
//   }, [matchArr])
  
//   useEffect(() => {
//     console.log(dirido)
//   }, [dirido])

//   // async function checkMatch (postPara, postDe) {
//   //   if (postPara === userEmail) {
//   //     setOpenNotif(true)
//   //     let docID = `${postDe}-${nm}`
//   //     const usersRef = doc(firestore, "matches", docID)
//   //     await setDoc(usersRef, {
//   //       horaDelMatch: currTime,
//   //       de: postDe,
//   //       para: postPara
//   //     })
//   //   }
//   // }
  
//   // useEffect(() => {
//   //   posts.forEach(post => checkMatch(post.para, post.de))
//   // }, [matchArr])
  
//   return (
//     <>
//       <PageHeader />
//       <div style={{paddingTop:'15px', paddingLeft:'23px'}}>
//         <h1>ADAM LIKES YOU 🤑</h1>
//         {
//           posts.map((post, i, arr) => {
//             const owner = users?.find((user) => user.email == post.de)
//             const receiver = users?.find((user) => user.email == post.para)
//             return (
//               <>
//                 <Card 
//                   username={owner.username}
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
//         {/* {
//           openNotif &&
//           <Notification 
//             openNotif={openNotif} 
//             setOpenNotif={setOpenNotif} 
//             notTo="lalo"
//             title="FELICIDADES"
//           />
//         } */}
//       </div>
//     </>
//   )
// }

// export default modeloTres