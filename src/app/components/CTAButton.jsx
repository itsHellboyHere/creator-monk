"use client"
import styles from "../css/CTAButton.module.css"

import { useRouter } from "next/navigation"

export default function CTAButton(){
    const router = useRouter()
    
    const handleClick = () => {
        router.push("/contact")
    }
    
    return <button className={styles.btn} onClick={handleClick}>
        Get Free Consultation
    </button>
}