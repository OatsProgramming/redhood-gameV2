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


export default function pointerCollision(charStore: CharMoveState & CharMoveAction, e: PointerEvent, obsImg: HTMLElement) {
    const { character: char, setCharPos } = charStore
    if (!char || !obsImg) return

    const obsImgRect = obsImg.getBoundingClientRect()
    const charRect = char.getBoundingClientRect()
    const { sideX, sideY } = charLocator(charRect, obsImgRect)
    const computedChar = getComputedStyle(char)
    const charScale = isFinite(Number(computedChar.scale)) ? 
        Number(computedChar.scale) : 1

    let lineX: Line | undefined;
    let lineY: Line | undefined;
    const midX = charRect.width / (2 * charScale)
    const charLine: Line = {
        ptOne: {
            x: charRect.left + midX,
            // Determine which side of y will most likely collide
            y: charRect[(
                sideY === 'top' || sideY === undefined ? 
                    'bottom' :
                    'top'
            )]
        },
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

    const buffer = 10
    // This is to help ensure that the char doesnt go in the hitBox
    // Calculated by getting the amnt of char that gets in the hitBox then removing it
    const padding = (1 - charScale)
    const paddingX = (padding * charRect.width)
    const paddingY = (charRect.height + (padding * charRect.height))

    if (intersectionX.point) {
        setCharPos({
            x: intersectionX.point.x - (midX + paddingX),
            y: intersectionX.point.y - (paddingY + (
                    sideY === 'top' ? 
                        buffer : 
                        -buffer
                ))
            })
        }
    else if (intersectionY.point) {
        setCharPos({
            x: intersectionY.point.x - (midX + (
                sideX === 'left' ? 
                    paddingX + buffer : 
                    -paddingX - buffer
            )),
            y: intersectionY.point.y - paddingY
        })
    }
}