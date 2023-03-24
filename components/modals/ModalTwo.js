import React from 'react'
import { MatchForm } from '../vitals/MatchForm'
import styles from "../../styles/modal.module.css"

export const ModalTwo = ({ openModal, setOpenModal, title }) => {
    return (
        openModal &&
        <div className={styles.globalContainer}>
            <div className={styles.modalContainer}>
                <div style={{marginTop:'15px', marginBottom:'15px'}}>
                    <h1>{title}</h1>
                    <MatchForm setOpenModal={setOpenModal} />
                    <br/>
                    <div style={{paddingTop:'50px'}}>
                        <button type="button" className={styles.specialBtn} onClick={() => setOpenModal(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}