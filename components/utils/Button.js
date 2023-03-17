import React from 'react'
import styles from "../../styles/button.module.css"

export const Button = ({ clickAction }) => {
    return (
        <div className={styles.btnPos}>
            <button type="button" className={styles.specialBtn} onClick={clickAction}>
                <span>confesar lige</span>
            </button>
        </div>
    )
}