import React from 'react'
import styles from "../../styles/notification.module.css"

export const MatchNotification = ({ openNotif, setOpenNotif, notTo }) => {
    return (
    <>
        { openNotif && 
        <div className={styles.globalContainer}>
            <div className={styles.modalContainer}>
                <div className={styles.mainLy}>
                    {/* ------------------------- */}
                    <div 
                        className={styles.child} 
                        style={{height:'80%', width:'200%'}} 
                        onClick={() => setOpenNotif(not => not-1)}
                    >
                        <div>
                            <ion-icon style={{fontSize:'48px'}} name="chevron-back"></ion-icon>
                        </div>
                    </div>
                    {/* ------------------------- */}
                    <div className={styles.center}>
                        <h2 className={styles.title}>
                            FELICIDADES, ESTOS SON TUS MATCHES
                        </h2>
                        <ion-icon style={{fontSize:'64px'}} name="heart"></ion-icon>
                        <h2>{notTo}</h2>
                        <p>Ya hiciste match, ve y haz lo tuyo</p>
                    </div>
                    {/* ------------------------- */}
                    <div 
                        className={styles.child} 
                        style={{height:'80%', width:'200%'}} 
                        onClick={() => setOpenNotif(not => not+1)}
                    >
                        <div>
                            <ion-icon style={{fontSize:'48px'}} name="chevron-forward"></ion-icon>
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