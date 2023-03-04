import React from 'react'
import { DatingForm } from "./DatingForm"
import styles from "../styles/modal.module.css"

export const Modal = ({ openModal, setOpenModal, title }) => {
    return (
        <div className={styles.globalContainer}>
            <div className={styles.modalContainer}>
                <div style={{marginTop:'15px', marginBottom:'15px'}}>
                    <h1>{title}</h1>                                                
                    <DatingForm text="Escribe el username de tu crush" />
                    <br/>
                    <button type="button" className={styles.formBtn} onClick={() => setOpenModal(false)}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}