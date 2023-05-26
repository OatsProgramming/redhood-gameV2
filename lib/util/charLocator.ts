/**
 * Before collision detection, check which side the character was on.
 *  Tried during and after collision: does not work whatsoever. DO NOT ATTEMPT
 * @param charRect 
 * @param obsRect 
 * @returns 
 */
export default function charLocator(charRect: DOMRect, obsRect: DOMRect) {
    // Y-Axis
    let sideY: 'top' | 'bottom' | undefined;
    if (charRect.bottom < obsRect.top) sideY = 'top'
    else if (charRect.bottom > obsRect.bottom) sideY = 'bottom'

    // X-Axis
    let sideX: 'left' | 'right' | undefined;
    if (charRect.right < obsRect.left) sideX = 'left'
    else if (charRect.left > obsRect.right) sideX = 'right'

    return { sideY, sideX }
}