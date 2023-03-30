import React from 'react'
import styles from "../styles/loader.module.css"

export const Loader = () => {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.mainLy}>
                <div className={styles.child}>
                    <div>
                        <h1 className={styles.title}>
                            DATE UN
                            <br/>
                            <span className={styles.font}>
                                DATE
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}