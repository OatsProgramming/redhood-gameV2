import charLocator from "./charLocator"

/**
 * To check for collision based off from Arrow Keys.
 * @param charStore 
 * @param obstacle 
 * @returns 
 */

export default function keyCollision(charStore: CharMoveState & CharMoveAction, obstacle: HTMLDivElement) {
    const { character: char, setCharPos, getCurrentPos } = charStore
    if (!char) return

    const charRect = char.getBoundingClientRect()
    const obsRect = obstacle.getBoundingClientRect()!
    const { sideX, sideY } = charLocator(charRect, obsRect)
    const currentCharPos = getCurrentPos()
    const rangeBuffer = 15

    // Collision detection
    if (!(
        charRect.left < obsRect.right + rangeBuffer &&
        charRect.right > obsRect.left - rangeBuffer &&
        charRect.bottom < obsRect.bottom + rangeBuffer &&
        charRect.bottom > obsRect.top - rangeBuffer
    )) return

    // Determine the bounce back for collision
    let x = 0
    let y = 0
    switch (sideX) {
        case 'left': {
            x = -rangeBuffer
            break;
        }
        case 'right': {
            x = rangeBuffer
            break;
        }
    }
    switch (sideY) {
        case 'top': {
            y = -rangeBuffer
            break;
        }
        case 'bottom': {
            y = rangeBuffer
            break;
        }
    }

    setCharPos({
        x: currentCharPos.x + x,
        y: currentCharPos.y + y
    })
}