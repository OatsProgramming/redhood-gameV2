'use client'

import { useEffect, useRef, useState } from "react";
import styles from './itemsDialog.module.css'
import ItemCard from "../../ItemCard/ItemCard";
import toggleDialog from "@/lib/util/toggleDialog";
import useInventory from "@/lib/zustand/inventoryStore";
import useCardType from "@/lib/zustand/cardTypeStore";
import useCharMove from "@/lib/zustand/charMoveStore";

export default function ItemsDialog({ items, isCharNear }: {
    items: Item[],
    isCharNear: boolean
}) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const { character, setCharacter } = useCharMove()
    const [itemList, setItemList] = useState(items)
    const { inventory } = useInventory()
    const { isSelling, setIsSelling } = useCardType()
    
    useEffect(() => {
        if (isSelling) {
            setItemList(() => 
                inventory.filter(inventoryItem => inventoryItem.category === items[0].category)
            )
        }
        else setItemList(items)
    }, [isSelling])

    useEffect(() => {
        function interactModal(e: KeyboardEvent) {
            const dialog = dialogRef.current
            if (e.code !== 'KeyQ' || !dialog || !isCharNear) return
            toggleDialog(dialogRef, character, setCharacter)
            if (!dialog.open) setIsSelling(false)
        }

        window.addEventListener('keydown', interactModal)
        return () => {
            window.removeEventListener('keydown', interactModal)
        }
    }, [dialogRef.current?.open, isCharNear])

    return (
        <dialog ref={dialogRef} className={styles['itemsDialog']}>
            <div onPointerDown={() => setIsSelling(!isSelling)}>
                {isSelling ? 'Buy items' : 'Sell items'}
            </div>
            <ul>
                {itemList.map(item => (
                    <ItemCard
                        key={item.name}
                        item={item}
                        squareImg="https://i.imgur.com/zpWAtja.png"
                        rectImg="'https://i.imgur.com/TTSJ7yA.png'"
                    />
                ))}
            </ul>
            <button className={styles['closeBtn']} onClick={() => toggleDialog(dialogRef, character, setCharacter)}>
                Close
            </button>
        </dialog>
    )
}

