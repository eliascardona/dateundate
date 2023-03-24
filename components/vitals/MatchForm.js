import React, { useContext, useEffect, useRef, useState } from 'react';
import { firestore } from '../../firebase/base';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import styles from '../../styles/forms.module.css';
import { nm } from '../../utils/utils';
import { AuthContext } from '../../contexts/AuthContext';

export const MatchForm = () => {
  const authData = useContext(AuthContext);
  const [owner, setOwner] = useState();
  const [err, setErr] = useState('');
  const usernameRef = useRef();
  const [users, setUsers] = useState([]);
  const [ganadores, setGanadores] = useState();
  const [succesMsg, setsuccesMsg] = useState("")  

  //get users collection data
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'users'),
      (querySnapshot) => {
        const res = [];
        querySnapshot.forEach((doc) => {
          res.push(doc.data());
        });
        setUsers(res);
      }
    );
    return unsubscribe;
  }, [authData]);

  //get owner data
  useEffect(() => {
    const q = query(
      collection(firestore, 'users'),
      where('email', '==', authData.user ? authData.user.email : '')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs[0] && setOwner(querySnapshot.docs[0].data());
    });
    return unsubscribe;
  }, [authData]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'ganadores'),
      (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setGanadores({
          porMasLikes: data[0],
          porPrimerosMatches: data[1],
        });
      }
    );
    return unsubscribe;
  }, []);

  // let userName = usernameRef.current.value
  const [mainSubject, setMainSubject] = useState('');

  const confessCrush = async () => {
    setErr('');
    const usersRef = collection(firestore, 'users');

    //Si el usuario no ingreso el "@" lo ingresamos nosotros.
    mainSubject = mainSubject.trim(); //Elimina espacios en las puntas.
    if (mainSubject[0] != '@') {
      mainSubject = `@${mainSubject}`;
      //Pendiente, no prioridad: Aquí se deben de eliminar todos los espacios (HECHO)
      //Ejemplo '@alex '
    }

    if (mainSubject == owner.username) {
      setErr('No puedes ingresar tu propio usuario.');
      return;
    }

    //Consultar perfil del destinatario
    const destinatario = query(usersRef, where('username', '==', mainSubject));
    const consultaDesatinatario = await getDocs(destinatario);
    const objetoDestinatario = consultaDesatinatario.docs[0]
      ? consultaDesatinatario.docs[0].data()
      : undefined;

    //Consultar perfil del remitente
    //A pesar de que sea un arreglo, la variable la dejamos como 'objetoRemitente'
    const remitente = query(usersRef, where('username', '==', owner.username));
    const consultaRemitente = await getDocs(remitente);
    const objetoRemitente = consultaRemitente.docs[0].data().likes;
    const usernameRemitente = consultaRemitente.docs[0].data().username;

    if (objetoDestinatario) {
      let docID = `p${nm()}`;
      let date = new Date();
      await updateDoc(doc(firestore, 'users', objetoDestinatario.email), {
        likes: arrayUnion(owner.username),
      })
      const updatedDestinatario = await getDoc(doc(firestore, 'users', objetoDestinatario.email)).then((doc) => doc.data())

      if(updatedDestinatario.likes.length > ganadores.porMasLikes.likes) {
        setDoc(doc(firestore, 'ganadores', 'porMasLikes'), {
          likes: updatedDestinatario.likes.length,
          username: updatedDestinatario.username
        })
      }

      await setDoc(doc(firestore, 'posts', docID), {
        remitente: owner.username,
        destinatario: mainSubject,
        cardID: docID,
        timestamp: date.getTime(),
      });

      //Verificar si hay match viendo si existe el perfil en los likes del remitente
      if (objetoRemitente.includes(objetoDestinatario.username)) {
        const usersArr = [
          usernameRemitente,
          objetoDestinatario.username,
        ].sort();
        //Agregar doc con sus respectivos matches
        await setDoc(
          doc(
            firestore,
            'matches',
            `${usernameRemitente}-${objetoDestinatario.username}`
          ),
          {
            users: usersArr,
            timestamp: date.toISOString(),
          }
        );

        if (
          ganadores.porPrimerosMatches.matches.length < 3 &&
          ganadores.porPrimerosMatches.matches.filter(
            (i) => JSON.stringify(i.personas) == JSON.stringify(usersArr)
          ).length == 0
        ) {
          updateDoc(doc(firestore, 'ganadores', 'porPrimerosMatches'), {
            matches: arrayUnion({
              personas: usersArr,
              timestamp: date.toISOString(),
            }),
          });
        }
      }
    } else {
      setErr('El usuario ingresado no existe, vuelve a intentar.');
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
        onClick={(e) => {
          confessCrush()
          setsuccesMsg("Confesión enviada con éxito")
        }}
        disabled={!owner}
        className={styles.formBtn}
      >
        enviar
      </button>
      <br />
      <strong style={{color: 'rgb(13, 187, 13)'}}>
        {succesMsg}
      </strong>
      <br />
      <p className={styles.alertLabel}>{err}</p>
      <h3>Lista de usuarios registrados 🤫 </h3>
      <div className={styles.scrollable}>
        {users.map((usr) => {
          return (
            <span style={{ display: 'block' }} key={usr.username}>
              {usr.username}
            </span>
          );
        })}
      </div>
    </div>
  );
};
