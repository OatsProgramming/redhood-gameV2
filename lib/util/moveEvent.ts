/**
 * For on-screen buttons if user decides to be on mobile.
 * It returns a KeyboardEvent that can be dispatched; it'll bubble up and be caught at the 
 * appropiate event handlder.
 * @param isRunning
 * @param keyName 
 * @param keyUp 
 * @returns 
 */
export default function moveEvent(isRunning: boolean, keyName: string, keyUp?: true){
    let eventName = 'keydown'
    if (keyUp) eventName = 'keyup'
    return new KeyboardEvent(eventName, {
        key: keyName,
        shiftKey: isRunning,
        bubbles: true,
        code: keyName === 'KeyQ' ? keyName : '',
        repeat: true,
    })
}