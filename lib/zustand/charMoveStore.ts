import { create } from 'zustand'
import isEqual from 'lodash/isEqual'

/**
 * For character movement. Move via keyboard or pointer.
 * 
 */

const useCharMove = create<CharMoveState & CharMoveAction>()((set, get) => ({
    character: null,
    animation: 'stand',
    move: { x: 0, y: 0 },
    isGoing: false,
    firstTimer: null,
    // firstTimer does not clearTimeout the second one automatically if
    // firstTimer has finished executing
    secondTimer: null,
    moveByKey: (e) => {
        const div = get().character!
        const animation = get().animation
        const isGoing = get().isGoing
        const currentPos = get().getCurrentPos()
        const firstTimer = get().firstTimer
        const secondTimer = get().secondTimer

        div.style.setProperty('--duration', '200ms')

        let moveX = 0
        let moveY = 0

        // if goHere() called first, stop that animation
        if (isGoing && firstTimer) {
            clearTimeout(firstTimer)
            if (secondTimer) clearTimeout(secondTimer)

            set({
                isGoing: false,
                move: currentPos,
                firstTimer: null,
                secondTimer: null
            })
        }
        // Determine the speed
        if (e.key.includes('Arrow')) {
            if (e.shiftKey) {
                // Prevent shift highlighting
                e.preventDefault()
                animation !== 'run' && set({ animation: 'run' })
                moveX = moveY = 15
            } else {
                animation !== 'walk' && set({ animation: 'walk' })
                moveX = moveY = 5
            }
        } else if (e.code === 'Space') {
            animation !== 'jump' && set({ animation: 'jump' })
        }

        // Determine the direction
        switch (e.key) {
            // Turn off moveY for x-axis only direction
            case 'ArrowLeft': {
                moveY *= 0
                // Alt moveX direction
                moveX *= -1
                div.style.transform = 'scaleX(-1)'
                break;
            }
            case 'ArrowRight': {
                moveY *= 0
                div.style.transform = 'scaleX(1)'
                break;
            }
            // Turn off moveX for y-axis only direction
            case 'ArrowUp': {
                moveX *= 0
                // Alt moveY direction
                moveY *= -1
                break;
            }
            case 'ArrowDown': {
                moveX *= 0
                break;
            }
        }
        set(state => {
            const prev = state.move
            let x = prev.x + moveX
            let y = prev.y + moveY

            // Add in-game boundaries
            // Using clientWidth / clientHeight just in case of scrollbar present
            if (0 >= prev.x) {
                x = prev.x + 10
            } else if (document.documentElement.clientWidth - 20 <= prev.x) {
                x = prev.x - 10
            }

            if (0 >= prev.y) {
                y = prev.y + 10
            } else if (document.documentElement.clientHeight - 50 <= prev.y) {
                y = prev.y - 10
            }

            return ({ move: { x, y } })
        })
    },
    moveByPointer: (e) => {
        // Prevent char from traveling if screen pop up, obstacle, etc.
        if (e.target !== document.body) return

        const isGoing = get().isGoing
        const firstTimer = get().firstTimer
        const secondTimer = get().secondTimer
        const div = get().character!
        const currentPos = get().getCurrentPos()
        // Not pageX | pageY: only care about client window
        const newPos = {
            x: e.clientX - div.offsetWidth / 2,
            y: e.clientY - div.offsetHeight / 2,
        }

        // Check to see if there's an active transition
        if (isGoing) {
            const desiredPos = get().move
            // If user clicked on the same spot stop the callback 
            if (isEqual(newPos, desiredPos)) return
            // If clicked at a different spot, trash the timer to lower memory
            else if (firstTimer) {
                clearTimeout(firstTimer)
                if (secondTimer) clearTimeout(secondTimer)
                set({ firstTimer: null, secondTimer: null })
            }
            set({ move: currentPos })
        }

        // Get the distance btwn current position and place of interest
        const distance = Math.sqrt(
            Math.pow((currentPos.x - newPos.x), 2)
            + Math.pow((currentPos.y - newPos.y), 2)
        )

        // To deal with how long the transition will be
        const durationPointer = (Math.round(distance * 10))
        div.style.setProperty('--duration', durationPointer + 'ms')

        // Determine which way the character should face
        const direction = currentPos.x - newPos.x
        if (direction > 0) div.style.transform = 'scaleX(-1)'
        else div.style.transform = 'scaleX(1)'

        // Start transition
        set({ animation: 'run', move: newPos, isGoing: true })

        // Schedule a separate macrotask to let goHere() be considered finished from macrotask queue
        // This will help with setStates
        const id = setTimeout(() => {
            const secondId = setTimeout(() => {
                set({ animation: 'stand', isGoing: false })
            }, (durationPointer * (1 / 3)))

            set({ animation: 'walk', secondTimer: secondId })
        }, (durationPointer * (2 / 3)))

        set({ firstTimer: id })
    },
    // Neutral animation
    toStand: (e) => {
        if (e.key.includes('Arrow')) set({ animation: 'stand' })
    },
    setCharacter: (el) => set({ character: el }),
    setAnimation: (action) => set({ animation: action }),
    setCharPos: (pos) => set({ move: pos }),
    getCurrentPos: () => {
        const char = get().character!
        // Get position while transitioning (if goHere() called first)
        // use computed to get current pos (el.style will give end result rather in btwn)
        const computedChar = getComputedStyle(char)
        return ({
            x: parseInt(computedChar.left),
            y: parseInt(computedChar.top)
        })
    }
}))

export default useCharMove