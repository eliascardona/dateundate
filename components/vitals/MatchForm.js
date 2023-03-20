import React, { useEffect, useRef, useState } from "react";
import { auth, firestore } from "../../firebase/base";
import { onAuthStateChanged } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import styles from "../../styles/forms.module.css";
import { nm, currTime } from "../../utils/utils";
import { MatchNotification } from "../modals/MatchNotification"

export const MatchForm = () => {
  const [userEmail, setUserEmail] = useState();
  const [owner, setOwner] = useState();
  const [err, setErr] = useState("");
  const usernameRef = useRef();
  const [notTo, setNotTo] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const [users, setUsers] = useState([])

  useEffect(() => {
    const checkUserEmail = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) setUserEmail(user.email);
      });
    };
    checkUserEmail();
  }, []);

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
  
  // let userName = usernameRef.current.value
  const [mainSubject, setMainSubject] = useState("");

  const confessCrush = async () => {
    setErr("");
    const usersRef = collection(firestore, "users");
    
    //Si el usuario no ingreso el "@" lo ingresamos nosotros.
    if (mainSubject[0] != "@") {
      mainSubject = `@${mainSubject}`;
      //Pendiente, no prioridad: Aquí se deben de eliminar todos los espacios
      //Ejemplo '@alex '
    }

    //Consultar perfil del destinatario
    const destinatario = query(usersRef, where("username", "==", mainSubject));
    const consultaDesatinatario = await getDocs(destinatario);
    let objetoDestinatario = {};
    objetoDestinatario = consultaDesatinatario.docs[0] ? consultaDesatinatario.docs[0].data() : undefined;
      
    //Consultar perfil del remitente
    //A pesar de que sea un arreglo, la variable la dejamos como 'objetoRemitente'
    const remitente = query(usersRef, where("username", "==", owner.username));
    const consultaRemitente = await getDocs(remitente);
    let objetoRemitente;
    objetoRemitente = consultaRemitente.docs[0].data().likes;
    
    if (objetoDestinatario) {
      let docID = `p${nm}`;
      await updateDoc(doc(firestore, "users", objetoDestinatario.email), {
        likes: arrayUnion(owner.username),
      });
      await setDoc(doc(firestore, "posts", docID), {
        remitente: owner.username,
        destinatario: mainSubject,
        cardID: docID,
      });

      console.log(objetoRemitente);
      //Verificar si hay match viendo si existe el perfil en los likes del remitente
      if (objetoRemitente.includes(objetoDestinatario.username)) {
        
        //parte grafica
        setNotTo(objetoDestinatario.username)
        setOpenNotif(true)

        //Agregar doc con sus respectivos matches
        await setDoc(doc(firestore, "matches", objetoDestinatario.username), {
          'match-con': arrayUnion(consultaRemitente.docs[0].data().username),
        });
        
        await setDoc(doc(firestore, "matches", consultaRemitente.docs[0].data().username), {
          'match-con': arrayUnion(objetoDestinatario.username),
        });
      }

    } else {
      setErr("El usuario ingresado no existe, vuelve a intentar.");
    }
  };
  
  return (
    <div>
      <h2>Confiesa tu ligue</h2>
      <input
        type="text"
        ref={usernameRef}
        placeholder="A quien va dirigido (username)"
        className={styles.input}
        onChange={(e) => {
          e.preventDefault();
          setMainSubject(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={confessCrush}
        disabled={!owner}
        className={styles.formBtn}
      >
        enviar
      </button>
      <br />
      <p className={styles.alertLabel}>{err}</p>
      <h3>Lista de usuarios registrados: </h3>
      <div className={styles.scrollable}>
      {
        users.map(usr => {
          return (
            <span style={{display:'block'}} key={usr.username}>
              {usr.username}
            </span>
          )
        })
      }
      </div>
      {
        openNotif &&
        <MatchNotification 
          openNotif={openNotif} 
          setOpenNotif={setOpenNotif} 
          notTo={notTo}
          title="FELICIDADES"
        />
      }
    </div>
  );
}