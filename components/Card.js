import React from 'react'
import styles from "../styles/card.module.css"

export const Card = ({ username, para, cardID }) => {
    return (
        <div className={styles.card}>
            <strong><b>{username}</b></strong>
            <p>Me gusta <b>{para}</b>!</p>
        </div>
    )
}