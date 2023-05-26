import { create } from "zustand";

const useCharStats = create<CharStatsStore>()((set) => ({
    hp: 100,
    maxHP: 200,
    debuffSet: new Set(['Headache']),
    coins: 50_000,
    updateHP: (toBeAdded) => set(state => {
        const newHP = state.hp + toBeAdded
        // Dont go out of bounds
        if (newHP < 0) return { hp: 0 }
        else if (newHP > state.maxHP) return { hp: state.maxHP }
        return { hp: newHP }
    }),
    updateMaxHP: (toBeAdded) => set(state => ({ maxHP: state.maxHP + toBeAdded })),
    // Shouldnt have to worry about it going to the negatives
    updateCoins: (toBeAdded) => set(state => ({ coins: state.coins + toBeAdded })),
    updateDebuff: (debuff, toBeAdded) => set(state => {
        const prevSet = state.debuffSet
        const newSet = new Set<string>(prevSet)

        if (toBeAdded) newSet.add(debuff)
        else newSet.delete(debuff)
        
        return { debuffSet: newSet }
    })
}))

export default useCharStats