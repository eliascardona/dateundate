import { useEffect, useState } from "react"
import { auth, firestore } from "../firebase/base"
import {
  collection,
  getDocs,
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
            // const owner = users?.find((user) => user.email == post.remitente)
            // const receiver = users?.find((user) => user.email == post.destinatario)
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