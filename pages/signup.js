import React from 'react'
import { Signup } from '../components/vitals/Signup'
import { PageHeader } from '../components/PageHeader'
import styles from '../styles/login.module.css'

function signup() {
  return (
    <>
      <PageHeader />
      <div className={styles.centeredGrid}>
        <div className={styles.cardWhite}>
          <Signup />
        </div>
      </div>
    </>
  )
}

export default signup