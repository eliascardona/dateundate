import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/base'
import {
  doc,
  onSnapshot,
} from 'firebase/firestore'
import styles from "../styles/stats.module.css"

function stats() {
    const [masLikes, setMasLikes] = useState({})
    //Fetch de todos los posts
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(firestore, 'ganadores', 'porMasLikes'), (info) => {
            setMasLikes(info.data())
        })
        return unsubscribe
    }, [])
    
    // useEffect(() => {
    //     const unsubscribe = onSnapshot(doc(firestore, 'ganadores', 'porPrimerosMatches'), (info) => {
    //         setMasLikes(info.data())
    //     })
    //     return unsubscribe
    // }, [])

    return (
        <div className={styles.globalContainer}>
            <div className={styles.mainLy}>
                <div>
                    <h3>
                        Más guapx hasta ahora:
                        <br/>
                        { masLikes.username} con {masLikes.likes} likes
                    </h3>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default stats