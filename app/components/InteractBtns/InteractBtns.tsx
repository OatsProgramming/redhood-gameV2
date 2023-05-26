'use client'

import { useState, PointerEvent, useCallback } from 'react'
import moveEvent from '@/lib/util/moveEvent'
import styles from './interactBtns.module.css'
import btns from './btnList'

export default function InteractBtns() {
    const [isRunning, setIsRunning] = useState(false)
    const [firstTimer, setFirstTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [secondTimer, setSecondTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

    // Note to self: (bug)
    // When using on-screen btns, user has the ability to phase thru objects
    // After usage, user still has ability with keyboard btns (fix when possible)
    const handleMovement = useCallback(function (e: PointerEvent<HTMLButtonElement>, keyName: string) {
        e.preventDefault()
        const btn = e.currentTarget as HTMLButtonElement

        // Initial dispatch
        const firstTimerId = setTimeout(function tick() {
            btn.dispatchEvent(moveEvent(isRunning, keyName));

            // Prevent constantly "opening" dialog (otherwise cause errors)
            if (keyName === 'KeyQ') return

            // Loop (user holds on button)
            const secondTimerId = setTimeout(tick, 100)
            setSecondTimer(secondTimerId)
        }, 0)
        setFirstTimer(firstTimerId)
    }, [isRunning])

    const StopTimer = useCallback(function (e: PointerEvent<HTMLButtonElement>, keyName: string) {
        const btn = e.currentTarget as HTMLButtonElement

        // Turn off loop
        if (firstTimer) clearTimeout(firstTimer)
        if (secondTimer) clearTimeout(secondTimer)

        // Set animation back to stand
        btn.dispatchEvent(moveEvent(isRunning, keyName, true));
    }, [firstTimer, secondTimer])

    return (
        <div className={styles['interactBtns']}>
            {btns.map(btn => (
                <button 
                    key={btn.keyName} 
                    className={styles[btn.keyName]} 
                    onPointerDown={(e) => handleMovement(e, btn.keyName)} 
                    onPointerUp={(e) => StopTimer(e, btn.keyName)}
                >
                    {btn.svg}
                </button>
            ))}
            <button
                className={styles[`${isRunning ? 'run' : 'walk'}`]}
                onClick={() => setIsRunning(!isRunning)}
            >
                <img
                    loading='lazy'
                    src={
                        isRunning ? "https://www.svgrepo.com/show/189314/running-run.svg"
                            : "https://static.thenounproject.com/png/1037754-200.png"
                    }
                    width='100%'
                    alt='run'
                />
            </button>
        </div>
    )
}