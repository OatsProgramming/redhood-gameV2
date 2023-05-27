'use client'

import { useState, PointerEvent, useCallback } from 'react'
import keyEvent from '@/lib/util/keyEvent'
import styles from './interactBtns.module.css'
import btns from './btnList'
import Image from 'next/image'
import eye from '@/public/eye.svg'
import eyeSlash from '@/public/eyeSlash.svg'

export default function InteractBtns() {
    const [isRunning, setIsRunning] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
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
            btn.dispatchEvent(keyEvent(keyName, undefined, isRunning));

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
        btn.dispatchEvent(keyEvent(keyName, true, isRunning));
    }, [firstTimer, secondTimer])

    return (
        <>
            <div className={styles['interactBtns']}>
                <div className={styles['container']}>
                    <button onPointerDown={(e) => e.target.dispatchEvent(keyEvent('KeyE', undefined))}>
                        <img
                            loading='lazy'
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Backpack_%282551%29_-_The_Noun_Project.svg/1024px-Backpack_%282551%29_-_The_Noun_Project.svg.png?20180307034244'
                            alt='backpack'
                        />
                    </button>
                    <button className={styles['visibleBtn']} onPointerDown={() => setIsVisible(!isVisible)}>
                        <Image
                            src={isVisible ? eye : eyeSlash}
                            alt='Closed'
                            width={50}
                        />
                    </button>
                </div>
                {isVisible && (
                    <>
                        {btns.map(btn => (
                            <button
                                key={btn.keyName}
                                className={styles[btn.keyName]}
                                onPointerUp={(e) => StopTimer(e, btn.keyName)}
                                onPointerDown={(e) => handleMovement(e, btn.keyName)}>
                                {btn.svg}
                            </button>
                        ))}
                        <button
                            className={styles[`${isRunning ? 'run' : 'walk'}`]}
                            onClick={() => setIsRunning(!isRunning)}>
                            <img
                                loading='lazy'
                                width='100%'
                                alt='run'
                                src={
                                    isRunning ? "https://www.svgrepo.com/show/189314/running-run.svg"
                                        : "https://static.thenounproject.com/png/1037754-200.png"
                                }
                            />
                        </button>
                    </>
                )}
            </div>
        </>
    )
}