import { checkIntersection } from 'line-intersect';

/**
 * Created doIntersect to make code more readable and easier.
 *  Simply destructures charLine and line to return checkIntersection() result.
 * @param charLine 
 * @param line 
 * @returns 
 */
export default function doIntersect(charLine: Line, line: Line | undefined): Intersect {
    if (!line) return { type: 'none' }
    const { ptOne: { x: x1, y: y1 }, ptTwo: { x: x2, y: y2}} = charLine
    const { ptOne: { x: x3, y: y3 }, ptTwo: { x: x4, y: y4}} = line

    return checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
}