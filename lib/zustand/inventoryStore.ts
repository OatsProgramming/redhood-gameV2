import { create } from 'zustand'

const useInventory = create<InventoryStore>()((set) => ({
    inventory: [],
    addItem: (item) => set(state => {
        const { inventory } = state
        
        // If it doesnt exist within the list, add it
        const index = inventory.findIndex(inventoryItem => inventoryItem.name === item.name)
        if (index === -1) return ({ inventory: [...inventory, item]})

        // Otherwise, just increase amnt count (lower memory space)
        inventory[index].amnt += item.amnt
        return ({ inventory })
    }),
    removeItem: (item) => set(state => {
        const { inventory } = state

        // See if item is within inventory
        const index = inventory.findIndex(inventoryItem => inventoryItem.name === item.name)
        if (index === -1) return state
        
        // Remove item if depleted
        const newAmnt = inventory[index].amnt - item.amnt
        if (newAmnt === 0) {
            const copy = [...inventory]
            copy.splice(index, 1)
            return ({ inventory: copy })
        } 

        // Otherwise, only change amnt (lower memory space)
        inventory[index].amnt = newAmnt
        return ({ inventory })
    })
}))

export default useInventory