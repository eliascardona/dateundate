import React from 'react'
import { MatchForm } from '../vitals/MatchForm'
import styles from "../../styles/modal.module.css"

export const ModalTwo = ({ openModal, setOpenModal }) => {
    return (
        openModal &&
        <div className={styles.globalContainer}>
            <div className={styles.modalContainer}>
                <div className={styles.mainLy}>
                    <MatchForm setOpenModal={setOpenModal} />
                    <button type="button" className={styles.specialBtn} onClick={() => setOpenModal(false)}>
                        cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}