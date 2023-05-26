import { RefObject } from "react"

const cache = new Map()

/**
 * Toggles desired dialog and handles (dis/re)connection of character
 * to deal with movement
 * 
 * @param dialogRef 
 * @param character 
 * @param setCharacter 
 * @returns 
 */

export default function toggleDialog(
    dialogRef: RefObject<HTMLDialogElement>, 
    character: CharMoveState['character'],
    setCharacter: CharMoveAction['setCharacter'],
) {
    const dialog = dialogRef.current
    if (!dialog) return

    if (dialog.open) {
        // Reconnect character to allow movement
        const char = cache.get('current')
        setCharacter(char)
        cache.delete('current')

        dialog.close()
    } else {
        // Make sure that multiple dialogs (that arent related) arent all open at the same time
        // Otherwise, will cause character reconnection issues
        if (cache.has('current')) return
        
        // Disconnect character to disable movement
        cache.set('current', character)
        setCharacter(null)

        dialog.showModal()
    }
    
}
