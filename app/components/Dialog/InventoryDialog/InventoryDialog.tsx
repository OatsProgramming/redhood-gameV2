'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import styles from './inventoryDialog.module.css'
import useInventory from '@/lib/zustand/inventoryStore'
import toggleDialog from '@/lib/util/toggleDialog'
import useCharMove from "@/lib/zustand/charMoveStore";
import ItemCard from "../../ItemCard/ItemCard";
import useCardType from "@/lib/zustand/cardTypeStore";
import useCharStats from "@/lib/zustand/charStatsStore";
import categories from "./categories";

export default function InventoryDialog() {
    const { coins } = useCharStats()
    const { inventory } = useInventory()
    const { setInInventory } = useCardType()
    const { character, setCharacter } = useCharMove()

    const dialogRef = useRef<HTMLDialogElement>(null)
    const [category, setCategory] = useState<Category>('equipment')

    // useMemo since character movement rerenders components
    const showItems = useMemo(function () {
        return inventory.filter(item => item.category === category)
    }, [category])

    const handleCategory = useCallback(function (category: Category) {
        setCategory(category)
    }, [])

    useEffect(() => {
        function handleModal(e: KeyboardEvent) {
            if (e.code !== 'KeyE') return
            toggleDialog(dialogRef, character, setCharacter)
            setInInventory(dialogRef)
        }

        window.addEventListener('keydown', handleModal)
        return () => window.removeEventListener('keydown', handleModal)
    }, [dialogRef.current])

    return (
        <dialog className={styles['inventoryDialog']} ref={dialogRef}>
            <div className={styles['icons']}>
                {categories.map(val => (
                    <img
                        key={val.category}
                        loading="lazy"
                        src={val.imgUrl}
                        className={styles[val.category]}
                        onPointerDown={() => handleCategory(val.category)}
                    />
                ))}
            </div>
            <div className={styles['coins']}>
                {coins}
            </div>
            <div className={styles['items']}>
                {showItems.length > 0 ? (
                    showItems.map(item => (
                        <ItemCard
                            key={item.name}
                            item={item}
                            squareImg='https://i.imgur.com/vkHFpib.png'
                            rectImg="https://i.imgur.com/yhXHKa8.png"
                        />
                    ))
                ) : (
                    <div className={styles['empty']}>
                        <h2>Seems empty...</h2>
                        <img
                            loading="eager"
                            alt="empty icon"
                            src="https://static.thenounproject.com/png/5702323-200.png"
                        />
                    </div>
                )}
            </div>
        </dialog>
    )
}

