import { useEffect, useState } from "react"
import { auth, firestore } from "../firebase/base"
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where
} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { Button } from "../components/utils/Button"
import { Card } from "../components/utils/Card"
import { PageHeader } from "../components/utils/PageHeader"
import { ModalTwo } from "../components/modals/ModalTwo"
import { MatchForm } from "../components/vitals/MatchForm"
import { min } from "../utils/utils"

function Home() {
  const [userEmail, setUserEmail] = useState("")
  const [posts, setPosts] = useState([])
  const [matches, setMatches] = useState([])
  const [users, setUsers] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openNotif, setOpenNotif] = useState(false)
  const [owner, setOwner] = useState()
  
  useEffect(() => {
    const checkUserEmail = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) 
          setUserEmail(user.email)
      })
    }
    checkUserEmail()
  }, [])

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(firestore, "users", userEmail);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOwner(docSnap.data());
      } else {
        console.log("No user");
      }
    };
    userEmail && getOwner();
  }, [userEmail]);
  
  useEffect(() => {
    const getData = async () => {
      const data = []
      const collRef = collection(firestore, "users")
      const coll = await getDocs(collRef)
      let postDocs = coll.docs
      postDocs.forEach(info => {
        data.push(info.data())
      })
      setUsers(data)
    }
    getData()
  }, [])
  
  useEffect(() => {
    const getData = async () => {
      const data = []
      const collRef = collection(firestore, "posts")
      const coll = await getDocs(collRef)
      let postDocs = coll.docs
      postDocs.forEach(info => {
        data.push(info.data())
      })
      setPosts(data)
    }
    getData()
  }, [])
  
  let objetoRemitente = async function() {
    const collRef = collection(firestore, "users")
    const remitente = query(collRef, where("username", "==", owner.username))
    const consultaRemitente = await getDocs(remitente)
    let objRemitente
    objRemitente = consultaRemitente.docs[0].data().likes
    return objetoRemitente
  }

  let auxArr1 = []

  let globalLikesArr = async function () {
    users.forEach((itm, i, arr) => {
      auxArr1.push(itm.likes)
    })
    return auxArr1
  }
  
  useEffect(() => {
    globalLikesArr().then(globalLikes => {

      console.log("arreglo de likes globlaes: ")
      console.log(globalLikes)
      
      // console.log("arreglo matches: ")
      // objetoRemitente().then(remLikes => {
        
      //   remLikes.forEach(itm => 
      //     globalLikes.filter(itmJ => {
      //       if (itm === itmJ)
      //         console.log(`match de ${itm} e ${itmJ}`)
      //     })
      //   )

      // })
      
    })
  }, [])
  
  // useEffect(() => {
  //   const handle = setInterval(async () => {
  //     minTime = min(posts.flat())
  //   }, 30*1000);

  //   return () => clearInterval(handle);
  // }, []);
  
  return (
    <>
      <PageHeader />
      <div style={{paddingTop:'15px', paddingLeft:'23px'}}>
        <h1>ADAM LIKES YOU 🤑</h1>
        {
          posts.map((post, i, arr) => {
            return (
              <>
                <Card 
                  remitente={post.remitente}
                  destinatario={post.destinatario} 
                  cardID={post.cardID} 
                  key={post.cardID} 
                />
              </>
            )
          })
        }
        <Button clickAction={()=>{setOpenModal(true)}} />
        {
          openModal &&
          <ModalTwo 
            openModal={openModal} setOpenModal={setOpenModal} title="CONFIESA TU LIGUE" />
        }
      </div>
    </>
  )
}

export default Home