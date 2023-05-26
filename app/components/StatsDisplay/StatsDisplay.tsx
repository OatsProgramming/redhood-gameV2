'use client'

import { CSSProperties } from "react";
import useCharStats from "@/lib/zustand/charStatsStore";
import styles from './statsDisplay.module.css'

export default function StatsDisplay() {
    const { hp, maxHP, debuffSet } = useCharStats()
    const hpPercentage = (hp / maxHP) * 100
    const debuffList: string[] = []
    debuffSet.forEach(val => debuffList.push(val))

    return (
        <div className={styles['stats']}>
            <div
                className={styles['hp']}
                style={{
                    "--hpPercentage": `${hpPercentage}%`
                } as CSSProperties}
            >
                <span>HP: {hp} / {maxHP}</span>
            </div>
            <div className={styles['debuffs']}>
                Debuffs:
                {debuffList.map(debuff => (
                    <span key={debuff}>
                        {debuff}
                    </span>
                ))}
            </div>
        </div>
    )
}