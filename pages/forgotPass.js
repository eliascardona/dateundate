import React, { useRef } from "react"
import { auth } from "../firebase/base"
import { sendPasswordResetEmail } from "firebase/auth"
import { useRouter } from "next/router"
import { PageHeader } from '../components/utils/PageHeader'
import styles from "../styles/forgotpass.module.css"

function forgotPass() {
  const router = useRouter()
  const emailRef = useRef()

  const requestLink = async (e) => {
    e.preventDefault()
    let userEmail = emailRef.current.value
    await sendPasswordResetEmail(auth, userEmail)
    router.push("/login")
  }
  
  return (
    <>
      <PageHeader />
      <div className={styles.centeredGrid}>
        <div className={styles.cardWhite}>
          <h2>Recuperar contraseña</h2>
            <span>Ingresa el correo con el que te registraste</span>
            <input
              type="email"
              ref={emailRef}
              placeholder="name@somemail.com"
              className={styles.input}
            />
            <button
              type="button"
              onClick={requestLink}
              className={styles.formBtn}
            >
              Enviar código
            </button>
            <small className={styles.payMsg} onClick={() => router.push("/login")}>
              Regresar al login
            </small>
          </div>
        </div>
    </>
  )
}

export default forgotPass