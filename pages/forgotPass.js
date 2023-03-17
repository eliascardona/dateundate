import React, { useRef, useState } from "react"
import { auth } from "../firebase/base"
import { sendPasswordResetEmail } from "firebase/auth"
import { useRouter } from "next/router"
import { PageHeader } from '../components/utils/PageHeader'
import styles from "../styles/forms.module.css"

function forgotPass() {
  const router = useRouter()
  const emailRef = useRef()
  const [error, setError] = useState("")

  const requestLink = async (e) => {
    e.preventDefault()
    let userEmail = emailRef.current.value
    await sendPasswordResetEmail(auth, userEmail)
    router.push("/login")
  }
  
  return (
    <>
      <PageHeader />
      <div className={styles.centeredForm}>
        <div className={styles.cardWhite}>
          <h2>Recuperar contraseña</h2>
            <span>Ingresa el correo con el que te registraste</span>
            <input
              type="email"
              ref={emailRef}
              placeholder="name@somemail.com"
              className={styles.input}
            />
            <small className={styles.payMsg}>
              {error}
            </small>
            <br/>
            <button
              type="button"
              onClick={requestLink}
              className={styles.formBtn}
            >
              Enviar código
            </button>
          </div>
        </div>
    </>
  )
}

export default forgotPass