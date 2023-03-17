import React from 'react'
import styles from "../../styles/card.module.css"

export const Card = ({ remitente, destinatario, cardID }) => {
    return (
        <div className={styles.card}>
            <strong><b>{remitente}</b></strong>
            <p>Me gusta <b>{destinatario}</b>!</p>
        </div>
    )
}