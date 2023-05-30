'use client'

import { CSSProperties, lazy, memo, useEffect, useRef, useState } from "react"
import styles from './obstacle.module.css'
import charLocator from "@/lib/util/charLocator";
import keyCollision from "@/lib/util/keyCollision";
import pointerCollision from "@/lib/util/pointerCollision";
import useCharMove from "@/lib/zustand/charMoveStore";
import { AnimatePresence, LazyMotion, m } from 'framer-motion'
import popinVariants from "@/lib/framer/popinVariants";

const ItemsDialog = lazy(() =>
    import('../Dialog/ItemsDialog/ItemsDialog')
)

const loadFeatures = () => 
    import('@/lib/framer/domAnimation').then(mod => mod.default)

const Obstacle = memo(function ({ image, style, items, isInteractive, hitBoxStyle }: {
    image: string,
    items?: Item[],
    isInteractive?: true,
    /**
     * Don't mess with width or height: treat all objects present in window as paper cutouts.
     * Use scale only for resizing; otherwise, will affect the collision borders.
     */
    style: RequiredStyles & Omit<CSSProperties, 'height' | 'width'>
    /**
     * Width & height should be given as numbers for percentages. All others can be given in any unit.
     */
    hitBoxStyle?: HitBoxStyle
}) {
    const charStore = useCharMove()

    const obsRef = useRef<HTMLDivElement>(null)
    const obsImgRef = useRef<HTMLImageElement>(null)
    const bubbleRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [isCharNear, setIsCharNear] = useState(false)

    // For collision
    useEffect(() => {
        function collisionDetection(e: KeyboardEvent | PointerEvent) {
            if (!obsRef.current || !obsImgRef.current) return

            // Only care about character's movement
            // else if (e.target !== document.body) return
            else if (e instanceof KeyboardEvent && !e.key.includes('Arrow')) return

            // Check if user is using taps for movement
            else if (e instanceof PointerEvent) {
                pointerCollision(charStore, e, obsRef.current)
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
        const container = containerRef.current

        if (!char || !obs || !container) return

        const obsRect = obs.getBoundingClientRect()
        const charRect = char.getBoundingClientRect()

        // For 3D effect
        if (charRect.bottom > obsRect.bottom) container.style.zIndex = '0'
        // In front of char
        else container.style.zIndex = '2'

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

    // Cant get the position relative to img. Set it with js
    useEffect(() => {
        const img = obsImgRef.current
        const bubble = bubbleRef.current
        if (!img || !bubble) return

        const imgStyle = getComputedStyle(img)
        bubble.style.bottom = parseInt(imgStyle.height) + 'px'

    }, [bubbleRef.current])

    return (
        <div className={styles['container']} ref={containerRef} style={style}>
            <div className={styles['hitBox']} ref={obsRef} style={hitBoxStyle} />
            {items && (
                <ItemsDialog
                    items={items}
                    isCharNear={isCharNear}
                />
            )}
            <div className={styles['shadow']} >
                <img
                    src={image}
                    ref={obsImgRef}
                    className={styles['obstacle']}
                />
                {isInteractive && (
                    <LazyMotion features={loadFeatures}>
                        <AnimatePresence initial={false}>
                        {isCharNear && (
                            <m.div
                                className={styles['textBubble']}
                                ref={bubbleRef}
                                variants={popinVariants}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                transition={{ duration: 1 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="blanchedAlmond" viewBox="0 0 16 16">
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                </svg>
                            </m.div>
                        )}
                    </AnimatePresence>
                    </LazyMotion>
                )}
            </div>
        </div>
    )
}, (prevProps, nextProps) => {
    return prevProps.image === nextProps.image
})

export default Obstacle