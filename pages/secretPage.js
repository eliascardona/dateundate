import { useEffect, useRef, useState } from "react"
import { auth, firestore } from "../firebase/base"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { PageHeader } from "../components/PageHeader"
import { Modal } from "../components/Modal"
import { Notification } from "../components/Notification"
import { currTime, nm } from "../utils/utils"

function secretPage() {
  const [userEmail, setUserEmail] = useState("")
  const [posts, setPosts] = useState([])
  const [rcvs, setRcvs] = useState([])
  const [matches, setMatches] = useState([])
  const [users, setUsers] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [openNotif, setOpenNotif] = useState(false)
  const [matchTo, setMatchTo] = useState("")
  
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
    const getUsers = async () => {
      const users = []
      const usersRef = collection(firestore, "users")
      const usersQuery = await getDocs(usersRef)
      usersQuery.forEach((user) => {
        users.push(user.data())
      }) 
      setUsers(users)
    }
    getUsers()
  }, [])
  
  useEffect(() => {
    const getPosts = async () => {
      const data = []
      const collRef = collection(firestore, "confesiones")
      const coll = await getDocs(collRef)
      let postDocs = coll.docs
      postDocs.forEach(async (info) => {
        data.push(info.data())
      })
      setPosts(data)
    }
    getPosts()
  }, [])
  
  const [sender, setSender] = useState("")
  useEffect(() => {
    const getSender = async () => {
      const info = {}
      if (!userEmail) {
        const docRef = doc(firestore, "users", userEmail)
        const docData = await getDoc(docRef)
        //docData
        if (docData.exists()) {
          info = docData.data()
          setSender(info.email)
        }
      }
    }
    getSender()
  }, [userEmail])
  
  const [resultantArrayOne, setResultantArrayOne] = useState([])
  useEffect(() => {
    let effectArr = []
    posts.forEach(post => {

      effectArr = getRcvs(post.para)
      setResultantArrayOne(effectArr)
      
      // setResultantArrayOne(resArr => resArr.push(effectArr))
      // setResultantArrayOne(() => getRcvs(post.para))
    })
  }, [posts])
  
  useEffect(() => {
    console.log(resultantArrayOne)
  }, [resultantArrayOne])

  async function getRcvs (postPara) {
    const data = []
    const collRef = collection(firestore, "users")
    const q = query(collRef, "users", where("email", "==", postPara))
    const coll = await getDocs(q)
    let postDocs = coll.docs
    postDocs.forEach(async (info) => {
      data.push(info.data())
    })
    return data
  }
  
  // useEffect(() => {
  //   console.log(rcvs)
  // }, [rcvs])

  useEffect(() => {
    const getMatchs = async () => {
      const data = []
      const collRef = collection(firestore, "macthes")
      const coll = await getDocs(collRef)
      let matchesDocs = coll.docs
      matchesDocs.forEach(async (info) => {
        data.push(info.data())
      })
      setMatches(data)
    }
    getMatchs()
  }, [])

  useEffect(() => {
    posts.forEach((post) => {
      checkMatch(post.para, post.de)
    })
  }, [posts])
  
  // useEffect(() => {
  //   rcvs.forEach((rcv) => {
  //     settingRcv(rcv.para)
  //   })
  // }, [rcvs])
  
  // async function settingRcv (postPara, postDe) {
  //   if (postPara === userEmail) {
  //     console.log('eres el winner')
  //   }
  // }

  async function checkMatch (postPara, postDe) {
    if (postPara === userEmail) {
      setOpenNotif(true)
      let docID = `${postDe}-${nm}`
      const usersRef = doc(firestore, "matches", docID)
      await setDoc(usersRef, {
        horaDelMatch: currTime,
        de: postDe,
        para: postPara
      })
    }
  }
  
  // useEffect(() => {
  //   matches.map((item, i, arr) => {
  //     checkMatchTo(item.de)
  //   })
  // }, [matches])

  // async function checkMatchTo (mapItem) {
  //   const owner = users?.find((user) => user.email == mapItem)
  //   setMatchTo(owner.de)
  // }

  // useEffect(() => {
  //   if (!matchTo) {
  //     console.log(matchTo)
  //   }
  // }, [matchTo])

  return (
    <>
      <PageHeader />
      <div style={{paddingTop:'15px', paddingLeft:'23px'}}>
        <h1>ADAM LIKES YOU 🤑</h1>
        {
          posts.map((post, i, arr) => {
            const owner = users?.find((user) => user.email == post.de)
            const receiver = users?.find((user) => user.email == post.para)
            return (
              <>
                <Card 
                  username={owner.username}
                  para={receiver.username} 
                  cardID={post.cardID} 
                  key={post.cardID} 
                />
                <Notification 
                  openNotif={openNotif} 
                  setOpenNotif={setOpenNotif} 
                  notTo={owner.username}
                  title="FELICIDADES"
                  key={post.cardID}
                />
              </>
            )
          })
        }
        <Button clickAction={()=>{setOpenModal(true)}} />
        {
          openModal &&
          <Modal 
            openModal={openModal} setOpenModal={setOpenModal} title="CONFIESA TU LIGUE" />
        }
        {/* {
          match &&
          <Notification 
            openNotif={openNotif} 
            setOpenNotif={setOpenNotif} 
            notTo={matchTo}
            title="FELICIDADES"
          />
        } */}
      </div>
    </>
  )
}

export default secretPage