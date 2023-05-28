type AnimNames = 'stand' | 'walk' | 'run' | 'jump'

type Position = { x: number, y: number }

type CharMoveState = {
    character: HTMLDivElement | null,
    animation: AnimNames,
    move: Position,
    isGoing: boolean,
    firstTimer: ReturnType<typeof setTimeout> | null,
    secondTimer: ReturnType<typeof setTimeout> | null,
}

type CharMoveAction = {
    moveByKey: (e: KeyboardEvent) => void,
    toStand: (e: KeyboardEvent) => void,
    moveByPointer: (e: PointerEvent) => void,
    setCharacter: (el: HTMLDivElement | null) => void,
    setAnimation: (action: AnimNames) => void,
    setCharPos: (pos: Position) => void,
    getCurrentPos: () => Position
}

type Line = {
    ptOne: Position,
    ptTwo: Position
}

type Intersect = {
    type: 'none' | 'intersecting' | 'parallel' | 'colinear',
    point?: Position
}

type ReqCSS = 'top' | 'left'
type RequiredStyles = Record<ReqCSS, string | number> & {
    scale?: string
}

type Category = 'ingestible' | 'equipment' | 'material' | 'quest'

type CategoryImg = {
    category: Category,
    imgUrl: string
}

type Item = {
    name: string,
    description: string,
    imgUrl: string,
    price: number,
    category: Category,
    addHP?: number,
    addDef?: number,
    addAtk?: number,
    addDebuff?: string
}

type InventoryItem = Item & {
    amnt: number
}

type InventoryStore = {
    inventory: InventoryItem[],
    addItem: (item: InventoryItem) => void,
    removeItem: (item: InventoryItem) => void
}

type CardTypeStore = {
    isSelling: boolean,
    inInventory: boolean,
    setIsSelling: (isSelling: boolean) => void,
    setInInventory: (dialogRef: RefObject<HTMLDialogElement>) => void
}

type CharStatsStore = {
    hp: number,
    maxHP: number,
    debuffSet: Set<string>,
    coins: number,
    updateHP: (toBeAdded: number) => void,
    updateMaxHP: (toBeAdded: number) => void,
    updateCoins: (toBeAdded: number) => void,
    updateDebuff: (debuff: string, toBeAdded?: true) => void,
}

type TutorialVid = {
    url: string,
    name: string,
    description: string
}