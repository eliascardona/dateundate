import React from 'react'
import styles from "../../styles/modal.module.css"

export const MatchNotification = ({ openNotif, setOpenNotif, notTo, title }) => {
    return (
    <>
        { openNotif && 
        <div className={styles.globalContainer}>
            <div className={styles.modalContainer}>
                <div className={styles.centeredGrid} style={{marginTop:'15px', marginBottom:'15px'}}>
                    <h1>{title}</h1>
                    <h3>Hiciste match con {notTo}</h3>
                    <button type="button" className={styles.formBtn} onClick={setOpenNotif}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>        
        }     
    </>
    )
}