'use client'

import { lazy, memo } from 'react'
import styles from './itemCard.module.css'
import cacheInventoryItem, { itemCache } from '@/lib/util/cacheInventoryItem'
import { isEqual } from 'lodash'
import useCardType from '@/lib/zustand/cardTypeStore'

const DetailsDialog = lazy(() =>
    import('../Dialog/DetailsDialog/DetailsDialog')
)

function itemCard({ item, squareImg, rectImg }: {
    item: Item | InventoryItem,
    squareImg: string,
    rectImg: string
}) {

    const { inInventory, isSelling } = useCardType()

    if (inInventory || isSelling) cacheInventoryItem(item as InventoryItem)

    return (
        <li className={styles['itemCard']} style={{
            backgroundImage: `url(${squareImg})`
        }}>
            <img
                src={item.imgUrl}
                width={100}
            />
            <div className={styles['info']}>
                <p>{item.name}</p>
                {
                    inInventory || isSelling ?
                    <p>Currently: {(item as InventoryItem).amnt || 0}</p> 
                    : <p>Cost: {item.price}</p>
                }
            </div>
            <DetailsDialog 
                item={item} 
                rectImg={rectImg} 
                inInventory={inInventory} 
                isSelling={isSelling}
            />
        </li>
    )
}

const ItemCard = memo(itemCard, (prev, next) => {
    const prevAmnt = itemCache.get(prev.item.name)
    const nextAmnt = (next.item as InventoryItem).amnt
    return prevAmnt === nextAmnt && isEqual(prev, next)
})

export default ItemCard