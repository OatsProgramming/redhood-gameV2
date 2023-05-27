'use client'

import { CSSProperties, lazy, memo, useEffect, useRef, useState } from "react"
import type { LottieRefCurrentProps } from "lottie-react";
import styles from './obstacle.module.css'
import textBubble from '@/assets/textBubble.json'
import charLocator from "@/lib/util/charLocator";
import keyCollision from "@/lib/util/keyCollision";
import pointerCollision from "@/lib/util/pointerCollision";
import useCharMove from "@/lib/zustand/charMoveStore";

const ItemsDialog = lazy(() =>
    import('../Dialog/ItemsDialog/ItemsDialog')
)

const Lottie = lazy(() =>
    import('lottie-react')
)

const Obstacle = memo(function ({ image, style, items, isInteractive }: {
    image: string,
    items?: Item[],
    isInteractive?: true,
    // Don't mess with width or height: treat all objects present in window as paper cutouts
    // Use scale only for resizing; otherwise, will affect the collision borders
    style: RequiredStyles & Omit<CSSProperties, 'height' | 'width'>
}) {
    const charStore = useCharMove()

    const obsRef = useRef<HTMLDivElement>(null)
    const obsImgRef = useRef<HTMLImageElement>(null)
    const lottieRef = useRef<LottieRefCurrentProps>(null)

    const [isCharNear, setIsCharNear] = useState(false)
    // Can't directly use .style for some reason (readonly)
    const [lottieClass, setLottieClass] = useState<'textBubble' | 'none'>('none')


    // For collision
    useEffect(() => {
        function collisionDetection(e: KeyboardEvent | PointerEvent) {
            if (!obsRef.current || !obsImgRef.current) return

            // Only care about character's movement
            else if (e.target !== document.body) return
            else if (e instanceof KeyboardEvent && !e.key.includes('Arrow')) return

            // Check if user is using taps for movement
            else if (e instanceof PointerEvent) {
                pointerCollision(charStore, e, obsImgRef.current)
            }

            // Or with the keys
            else keyCollision(charStore, obsRef.current!)
        }

        window.addEventListener('keydown', collisionDetection)
        document.documentElement.addEventListener('pointerdown', collisionDetection)
        return () => {
            window.removeEventListener('keydown', collisionDetection)
            document.documentElement.removeEventListener('pointerdown', collisionDetection)
        }
        // Don't add charStore.move as a dependency here
        // Will constantly create add/removeEventListeners 
    }, [charStore.character])

    // Check if character is near
    useEffect(() => {
        const obs = obsRef.current
        const char = charStore.character
        if (!char || !obs) return

        const obsRect = obs.getBoundingClientRect()
        const charRect = char.getBoundingClientRect()

        // For 3D effect
        // Behind char (charZIndex === 1)
        if (charRect.bottom > obsRect.bottom) obs.style.zIndex = '0'
        // In front of char
        else  obs.style.zIndex = '2'

        // Any further exec not necessary if cant interact with obstacle
        if (!isInteractive) return

        // For text bubble
        const buffer = 30
        const { sideX, sideY } = charLocator(charRect, obsRect)
        let isNearX: boolean;
        let isNearY: boolean;
        switch (sideX) {
            case 'left': {
                isNearX = (charRect.right > obsRect.left)
                break;
            }
            case 'right': {
                isNearX = (charRect.left < obsRect.right)
                break;
            }
            default: {
                // User can be on just one side 
                // If on sideY only, ignore this axis (set to true) 
                isNearX = true
            }
        }
        switch (sideY) {
            case 'top': {
                isNearY = (charRect.bottom > obsRect.top - buffer - 50)
                break;
            }
            case 'bottom': {
                isNearY = (charRect.top < obsRect.bottom + buffer)
                break;
            }
            default: {
                // User can be on just one side 
                // If on sideX only, ignore this axis (set to true) 
                isNearY = true
            }
        }

        if (isNearX && isNearY) {
            !isCharNear && setIsCharNear(true)
        } else {
            isCharNear && setIsCharNear(false)
        }

    }, [charStore.character, charStore.isGoing, charStore.move])

    // Text bubble animation & modal
    useEffect(() => {
        const lottie = lottieRef.current
        if (!lottie || !isInteractive) return

        if (isCharNear) {
            setLottieClass('textBubble')
            lottie.setDirection(1)
            lottie.playSegments([0, 22], true)
        } else {
            lottie.setDirection(-1)
            lottie.goToAndPlay(22, true)
        }

    }, [isCharNear])

    return (
        <div className={styles['container']} ref={obsRef} style={style}>
            
            {items && (
                <ItemsDialog
                    items={items}
                    isCharNear={isCharNear}
                />
            )}
            <div className={styles['shadow']}>
                <img
                    ref={obsImgRef}
                    className={styles['obstacle']}
                    src={image}
                />
                {isInteractive && (
                <Lottie
                    className={styles[lottieClass]}
                    lottieRef={lottieRef}
                    animationData={textBubble}
                    loop={false}
                    // Prevent animation on initial load
                    onDOMLoaded={() => lottieRef.current?.stop()}
                    // Ensures that the animation gets to play then safely remove the element
                    onComplete={() => !isCharNear && setLottieClass('none')}
                />
            )}
            </div>
        </div>
    )
}, (prevProps, nextProps) => {
    return prevProps.image === nextProps.image
})

export default Obstacle