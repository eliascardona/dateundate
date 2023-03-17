import React from 'react'
import { Login } from '../components/vitals/Login'
import { PageHeader } from '../components/utils/PageHeader'
import styles from '../styles/login.module.css'

function login() {
  return (
    <>
      <PageHeader />
      <div className={styles.centeredGrid}>
        <div className={styles.cardWhite}>
          <Login />
        </div>
      </div>
    </>
  )
}

export default login