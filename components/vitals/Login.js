import React, { useRef, useState } from "react"
import { auth } from "../../firebase/base"
import { signInWithEmailAndPassword } from "firebase/auth"
import styles from "../../styles/forms.module.css"
import { useRouter } from "next/router"

export const Login = () => {
  const router = useRouter()
  const emailRef = useRef()
  const passwordRef = useRef()
  
  const login = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    await signInWithEmailAndPassword(auth, email, password)
  }

  return (
    <>
      <h2>Acceso</h2>
        <span>Email</span>
        <input
          type="email"
          ref={emailRef}
          placeholder="name@somemail.com"
          className={styles.input}
        />
        <span>Contraseña</span>
        <input
          type="password"
          ref={passwordRef}
          placeholder="mypass123"
          className={styles.input}
        />
        <button
          type="button"
          onClick={(evt) => login(evt)}
          className={styles.formBtn}
        >
          Login
        </button>
        <small className={styles.payMsg}>
          ¿Nuevo por aquí?
          <span onClick={()=> router.push("/signup")} className="text-primary">
            {" "}
            <u style={{ cursor: "pointer" }}>Crear cuenta</u>
          </span>
        </small>
        <small className={styles.payMsg}>
          <span onClick={() => router.push("/forgotPass")} className="text-primary">
            <u style={{ cursor: "pointer" }}>
              ¿Olvidaste la contraseña?
            </u>
          </span>
        </small>
    </>
  )
}