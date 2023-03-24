import React from 'react'
import styles from "../../styles/notification.module.css"

export const MatchNotification = ({ openNotif, setOpenNotif, notTo }) => {
    return (
    <>
        { openNotif && 
        <div className={styles.globalContainer}>
            <div className={styles.modalContainer}>
                <div className={styles.layout}>
                    {/* ------------------------- */}
                    <div className={styles.center}>
                    </div>
                    {/* ------------------------- */}
                    <div className={styles.center}>
                        <h1 className={styles.title}>
                            FELICIDADES, ESTOS SON TUS MATCHES
                        </h1>
                        <ion-icon style={{fontSize:'64px'}} name="heart"></ion-icon>
                        <h2>{notTo}</h2>
                        <p>Ya hiciste match, ve y haz lo tuyo</p>
                    </div>
                    {/* ------------------------- */}
                    <div className={styles.center} style={{height:'80%', width:'100%'}} onClick={setOpenNotif}>
                        <div>
                            <ion-icon style={{fontSize:'60px'}} name="chevron-forward"></ion-icon>
                        </div>
                    </div>
                    {/* ------------------------- */}
                </div>
            </div>
        </div>        
        }     
    </>
    )
}