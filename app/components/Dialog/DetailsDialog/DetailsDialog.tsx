'use client'

import { useState, ChangeEvent, PointerEvent, useCallback, useRef, useMemo, useEffect } from "react";
import styles from './detailsDialog.module.css'
import useInventory from '@/lib/zustand/inventoryStore'
import useCharStats from "@/lib/zustand/charStatsStore"

export default function DetailsDialog({ item, rectImg, inInventory, isSelling }: {
    item: Item,
    rectImg: string,
    // To determine if dealing with InventoryItem or Item
    inInventory: boolean,
    isSelling: boolean
}) {
    const [amnt, setAmnt] = useState(0)
    const { coins, updateCoins, updateHP, updateDebuff } = useCharStats()
    const { inventory, addItem, removeItem } = useInventory()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const itemCoins = useMemo(() => {
        const resaleRate = 0.75
        return isSelling ?
            // Round it to keep currency system simple (account for precision loss)
            Math.round(Math.round((item.price * resaleRate) * 10) / 10)
            : item.price
    }, [item])

    const itemInInventory = useMemo(() => {
        return inventory.find(inventoryItem => inventoryItem.name === item.name)
    }, [inventory])

    // Determine if max will be based on user's inventory or user's current amnt of coins
    const dragMax = useMemo(() => {
        if (inInventory || isSelling) {
            return itemInInventory?.amnt ?? 0
        }
        // Account for possible precision loss
        let initDM = Math.round((coins / item.price) * 10) / 10
        return Math.floor(initDM)
    }, [itemInInventory?.amnt, coins, isSelling, inInventory])
    
    const mutateAmntByDrag = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target
        setAmnt(Number(input.value))
    }, [dragMax])

    const mutateAmntByClick = useCallback((e: PointerEvent<HTMLButtonElement>) => {
        const btn = e.target as HTMLButtonElement
        const value = Number(btn.textContent)
        const newAmnt = amnt + value

        // Make sure it doesnt go over or under the limit
        if (newAmnt < 0 || newAmnt > dragMax) return
        setAmnt(newAmnt)
    }, [dragMax, amnt])

    // Deal with whether user consumes or buys item
    const mutateInventory = useCallback(() => {
        const inventoryItem: InventoryItem = { ...item, amnt }

        // If dealing w/ user's items type
        if (inInventory || isSelling) {
            if (!itemInInventory) return
            // If ingestible
            else if (inInventory) {
                if (item.addHP) updateHP(amnt * item.addHP)
                if (item.addDebuff) updateDebuff(item.addDebuff, true)
            }
            // if selling
            else updateCoins(amnt * itemCoins)
            removeItem(inventoryItem)
        }

        // If dealing w/ store items
        else {
            const cost = -(amnt * item.price)
            updateCoins(cost)
            addItem(inventoryItem)
        }

    }, [amnt, isSelling, inInventory])

    const handleModal = useCallback(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (dialog.open) dialog.close()
        else dialog.showModal()
    }, [dialogRef.current])

    // Make sure amnt state never goes over dragMax
    useEffect(() => {
        if (!inputRef.current) return
        setAmnt(Number(inputRef.current.value))
    }, [dragMax, inputRef.current, inInventory])

    return (
        <>
            {/* Removed button to make it more neat */}
            <div className={styles['clickable']} onPointerDown={handleModal} />
            <dialog className={styles['details']} ref={dialogRef} style={{ backgroundImage: `url(${rectImg})` }}>
                {/* Added detailsContainer: cant directly change display of dialog w/o it going haywire */}
                <div className={styles['detailsContainer']}>
                    <img
                        loading='lazy'
                        src={item.imgUrl}
                        width={100}
                        alt={item.name}
                    />
                    <div className={styles['currentAmnt']}>
                        In inventory: {itemInInventory?.amnt ?? 0}
                    </div>
                    <div className={styles['description']}>
                        {item.description}
                    </div>
                    <div className={styles['drag']}>
                        <div>Amount: {amnt}</div>
                        {!inInventory &&
                            <>
                                <div>
                                    {isSelling ? 'Sell for' : 'Cost'}: {itemCoins}
                                </div>
                                <label htmlFor="drag">
                                    Max: {dragMax}
                                </label>
                            </>
                        }
                        <input
                            ref={inputRef}
                            value={amnt}
                            type="range"
                            name="drag"
                            min="0"
                            max={dragMax}
                            onChange={mutateAmntByDrag}
                        />
                        <div>
                            <button onPointerDown={mutateAmntByClick}>
                                -1
                            </button>
                            <button onPointerDown={mutateAmntByClick}>
                                +1
                            </button>
                        </div>
                    </div>
                    <div className={styles['btnContainer']}>
                        <button onPointerDown={handleModal}>
                            Cancel
                        </button>
                        <button onPointerDown={mutateInventory}>
                            Confirm
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}