import React from 'react'
import styles from "../../styles/card.module.css"
import { timeDifference } from '../../utils/utils'

export const Card = ({ remitente, destinatario, timestamp }) => {
    const date = new Date()
    return (
        <div className={styles.card}>
            <strong><b>{remitente}</b></strong>
            <p>Me gusta <b>{destinatario}</b>!</p>
            <span>{timeDifference(date.getTime(), timestamp)}</span>
        </div>
    )
}