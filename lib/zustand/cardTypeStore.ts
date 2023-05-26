import { create } from "zustand";

const useCardType = create<CardTypeStore>()((set, get) => ({
    isSelling: false,
    inInventory: false,
    setIsSelling: (isSelling) => {
        if (get().isSelling === isSelling) return
        set({ isSelling, inInventory: false })
    },
    setInInventory: (dialgRef) => {
        const dialog = dialgRef.current
        if (!dialog) return
        if (get().inInventory === dialog.open) return
        set({ isSelling: false, inInventory: dialog.open })
    }
}))

export default useCardType