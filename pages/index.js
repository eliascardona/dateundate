import { useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../firebase/base';
import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Button } from '../components/utils/Button';
import { Card } from '../components/utils/Card';
import { PageHeader } from '../components/utils/PageHeader';
import { ModalTwo } from '../components/modals/ModalTwo';
import { MatchNotification } from '../components/modals/MatchNotification';
import { AuthContext } from '../contexts/AuthContext';

function Home() {
  const authData = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [owner, setOwner] = useState();
  
  //Fetch datos del usuario
  useEffect(() => {
    const q = query(
      collection(firestore, 'users'),
      where('email', '==', authData.user ? authData.user.email : "")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docs[0] && setOwner(querySnapshot.docs[0].data());
      });
      return unsubscribe;
    }, [authData]);
    
    //Fetch datos de todos los usuarios
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
      return unsubscribe
  }, []);
  
  //Fetch de todos los posts
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'posts'),
      (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        data = data.sort((a, b) => b.timestamp - a.timestamp)
        setPosts(data);
      }
      );
      return unsubscribe;
    }, []);



    const [matches, setMatches] = useState([]);
    const [notifStates, setNotifStates] = useState([]); //Estado de apertura de notificaciones de match según la cant de matches, hay n notifs. ej: [true, false, true]
    
    //Búsqueda de matches al cambiar el estado de owner o users
    useEffect(() => {
    const findMatches = () => {
      const matches = [];
      if (owner && users) {
        const ownerLikes = owner.likes;
        const otherUsers = users.filter((u) => u.id != owner.id);
        
        for (let user of otherUsers) {
          if (
            ownerLikes.includes(user.username) &&
            user.likes.includes(owner.username)
          ) {
            matches.push(user);
          }
        }
      }
      setMatches(matches);
      setNotifStates(
        matches.map((value, i) => (notifStates[i] ? notifStates[i] : true))
        ); //Inicializa las notificaciones como abiertas
    };
    findMatches();
  }, [owner, users]);

  const handleNotifStateChange = (i) => {
    const nuevaLista = [...notifStates];
    nuevaLista[i] = !nuevaLista[i];
    setNotifStates(nuevaLista);
  };

  return (
    <>
      <PageHeader />
      <div style={{ paddingTop: '15px', paddingLeft: '23px' }}>
        <h1>ADAM LIKES YOU 😏</h1>
        {posts.map((post, i, arr) => {
          return (
            <Card
              remitente={post.remitente}
              destinatario={post.destinatario}
              timestamp={post.timestamp}
              key={post.cardID}
            />
          );
        })}
        <Button
          clickAction={() => {
            setOpenModal(true);
          }}
        />
        {openModal && (
          <ModalTwo
            openModal={openModal}
            setOpenModal={setOpenModal}
            title="CONFIESA TU LIGUE"
          />
        )}
        {matches.map((match, i) => {
          return (
            <MatchNotification
              openNotif={notifStates[i]}
              setOpenNotif={() => handleNotifStateChange(i)}
              notTo={match.username}
              title="FELICIDADES"
              key={match.id}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
