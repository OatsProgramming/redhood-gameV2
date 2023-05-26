import charLocator from "./charLocator"
import doIntersect from "./doIntersect"

/**
 * To check for collision based on line segments.
 * - Character Line: current position -> desired position
 * - Obstacle Line: Going off from character's current position -> sideX & sideY of obstacle
 *  
 * @param charStore 
 * @param e 
 * @param obsImg 
 * @returns 
 */


export default function pointerCollision(charStore: CharMoveState & CharMoveAction, e: PointerEvent, obsImg: HTMLImageElement) {
    const { character: char, setCharPos, getCurrentPos } = charStore
    if (!char || !obsImg) return

    const obsImgRect = obsImg.getBoundingClientRect()
    const charRect = char.getBoundingClientRect()
    const { sideX, sideY } = charLocator(charRect, obsImgRect)

    let lineX: Line | undefined;
    let lineY: Line | undefined;
    const charLine: Line = {
        ptOne: getCurrentPos(),
        ptTwo: {
            x: e.clientX,
            y: e.clientY
        }
    }

    // User is either left or right of obstacle
    if (sideX) {
        // Check lines that go vertically
        lineY = {
            ptOne: {
                x: obsImgRect[sideX],
                y: obsImgRect.top
            },
            ptTwo: {
                x: obsImgRect[sideX],
                y: obsImgRect.bottom
            }
        }
    }

    // User is either top or bottom of obstacle
    if (sideY) {
        // Check lines that go horizontally
        lineX = {
            ptOne: {
                x: obsImgRect.left,
                y: obsImgRect[sideY]
            },
            ptTwo: {
                x: obsImgRect.right,
                y: obsImgRect[sideY]
            }
        }
    }
    
    // Looking out for an intersection for two sides of the obstacle:
    // If user is at a given distance, only has two sides of the obstacle when choosing
    const intersectionX = doIntersect(charLine, lineX)
    const intersectionY = doIntersect(charLine, lineY)

    if (intersectionX.point) {
        let y = (charRect.height / 100)
        if (sideY === 'top') y = -(charRect.height) - 10

        setCharPos({
            ...intersectionX.point,
            y: intersectionX.point.y + y
        })
    } else if (intersectionY.point) {
        let x = (charRect.width / 100)
        if (sideX === 'left') x *= -charRect.width - 30

        setCharPos({
            ...intersectionY.point,
            x: intersectionY.point.x + x
        })
    }
}