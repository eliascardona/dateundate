import React, { useEffect, useRef, useState } from "react";
import { auth, firestore } from "../../firebase/base";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { 
  collection,
  doc,  
  query,
  where,
  getDocs,
  setDoc
} from "firebase/firestore";
import styles from "../../styles/forms.module.css";
import { useRouter } from "next/router";

export const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();
  const router = useRouter();
  const [username, setUsername] = useState("")
  const [usernameAllowed, setUsernameAllowed] = useState(false)
  const [showErr, setShowErr] = useState(false)
  
  useEffect(() => {
    async function checkUsername() {
      const usersRef = collection(firestore, "users")
      const q = query(usersRef, where("username", "==", `@${username}`))
      const querySnapshot = await getDocs(q)
      setUsernameAllowed(querySnapshot.docs.length === 0)
    }
    checkUsername()
    return (setUsernameAllowed(undefined))
  }, [username])

  const signUp = async () => {
    const name = nameRef.current.value;
    //Ponemos la primer letra de cada palabra del nombre en mayúscula.
    if(name.length > 0) {
      const words = name.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
      }
      name = words.join(" ")
    }
    const userName = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    usernameAllowed && await setDoc(doc(firestore, `users/${res.user.email}`), {
      email: res.user.email,
      id: res.user.uid,
      nombre: name,
      username: `@${userName}`,
      likes: []
    });
  };
  
  const logOut = async () => {
    await signOut(auth);
    window.location.reload();
  };

const handleSignUp = async (e) => {
  e.preventDefault();
  setShowErr(false)
  if(usernameAllowed) {
    signUp()
  } else {
    setShowErr(true)
  }
}

  return (
    <>
      <h2>Crear cuenta</h2>
      <span className={styles.label}>Nombre y Apellido</span>
      <input
        type="text"
        ref={nameRef}
        placeholder="Nombre"
        className={styles.input}
      />
      <span className={styles.label}>username, no escribir @</span>
      <input
        type="text"
        ref={usernameRef}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        className={styles.input}
      />
      {
        showErr && 
        <span className={styles.alertLabel}>
          username en uso, escoge otro 😥
        </span>
      }
      <span className={styles.label}>Email</span>
      <input
        type="email"
        ref={emailRef}
        placeholder="name@somemail.com"
        className={styles.input}
      />
      <span className={styles.label}>Contraseña</span>
      <input
        type="password"
        ref={passwordRef}
        placeholder="mypass123"
        className={styles.input}
      />
      <button
        type="button"
        className={styles.formBtn}
        onClick={handleSignUp}
        disabled={usernameAllowed === undefined}
      >
        Sign up
      </button>
      <small className={styles.payMsg}>
        ¿Ya tienes cuenta?
        <span onClick={()=> router.push("/login")} className="text-primary">
          {" "}
          <u style={{ cursor: "pointer" }}> Iniciar sesión</u>
        </span>
      </small>
      <small className={styles.payMsg}>
        Si ingresaste un email incorrecto, haz click
        <span onClick={logOut} className="text-primary">
          {" "}
          <u style={{ cursor: "pointer" }}> aquí</u>
        </span>
      </small>
    </>
  );
};