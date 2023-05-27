/**
 * For on-screen buttons if user decides to be on mobile.
 * It returns a KeyboardEvent that can be dispatched; it'll bubble up and be caught at the 
 * appropiate event handlder.
 * @param isRunning
 * @param keyName 
 * @param keyUp 
 * @returns 
 */
export default function keyEvent(keyName: string, keyUp?: true, isRunning?: boolean,){
    let eventName = 'keydown'
    if (keyUp) eventName = 'keyup'

    return new KeyboardEvent(eventName, {
        key: keyName,
        shiftKey: isRunning,
        bubbles: true,
        code: keyName.includes('Key') ? keyName : '',
        repeat: true,
    })
}