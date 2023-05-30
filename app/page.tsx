'use client'

import { lazy } from "react";
import Character from "./components/Character/Character";
import InteractBtns from "./components/InteractBtns/InteractBtns";
import Obstacle from "./components/Obstacle/Obstactle";
import food from "@/lib/inGameObjs/ingestible/fruits";
import StatsDisplay from "./components/StatsDisplay/StatsDisplay";
import obstacleUrls from "@/lib/inGameObjs/obstactleUrls";
import equipments from "@/lib/inGameObjs/equipments";
import materials from "@/lib/inGameObjs/materials";
import potions from "@/lib/inGameObjs/potions";
import questItems from "@/lib/inGameObjs/questItems";
import pastry from "@/lib/inGameObjs/ingestible/pastries";
import seafood from "@/lib/inGameObjs/ingestible/seafoods";
import beverages from "@/lib/inGameObjs/ingestible/beverages";
import fruits from "@/lib/inGameObjs/ingestible/fruits";
import meats from "@/lib/inGameObjs/ingestible/meats";
import pastries from "@/lib/inGameObjs/ingestible/pastries";
import veggies from "@/lib/inGameObjs/ingestible/veggies";

import styles from './page.module.css'

const InventoryDialog = lazy(() =>
  import('./components/Dialog/InventoryDialog/InventoryDialog')
)

export default function App() {
  return (
    <>
      {/* <InteractBtns /> */}
      <Character />
      <section className={styles['mapLayout']}>
        <div className={styles['greenery']}>
          <Obstacle
            image={obstacleUrls.tree}
            style={{
              top: '',
              left: '',
              scale: '3',
            }}
            hitBoxStyle={{
              width: 30,
              left: '-3px'
            }}
          />
          <Obstacle
            image={obstacleUrls.bush}
            style={{
              top: '100%',
              left: '0',
              scale: '1'
            }}
          />
        </div>
        <div className={styles['stallOne']}>
          <Obstacle
            isInteractive
            items={meats}
            image={obstacleUrls.meatStall}
            style={{
              top: '80%',
              left: '25%',
              scale: '2.5'
            }}
          />
          <Obstacle
            isInteractive
            items={pastries}
            image={obstacleUrls.pastryStall}
            style={{
              top: '25%',
              left: '20%',
              scale: '2'
            }}
          />
          <Obstacle
            isInteractive
            items={beverages}
            image={obstacleUrls.woodenCart}
            style={{
              top: '40%',
              left: '',
              scale: '1.5'
            }}
          />
        </div>
        <div className={styles['stallTwo']}>
          <Obstacle
            isInteractive
            items={equipments}
            image={obstacleUrls.woodenCart}
            style={{
              top: '0',
              left: '',
              scale: '1.5'
            }}
          />
          <Obstacle
            isInteractive
            items={fruits}
            image={obstacleUrls.fruitStall}
            style={{
              top: '70%',
              left: '70%',
              scale: '2.5'
            }}
          />
          <Obstacle
            isInteractive
            items={veggies}
            image={obstacleUrls.veggieStall}
            style={{
              top: '60%',
              left: '10%',
              scale: '1.5'
            }}
          />
        </div>
        <div className={styles['stallThree']}>
          <Obstacle
            isInteractive
            items={seafood}
            image={obstacleUrls.seafoodStall}
            style={{
              top: '40%',
              left: '',
              scale: '3'
            }}
          />
          <Obstacle
            isInteractive
            items={potions}
            image={obstacleUrls.purpleStall}
            style={{
              top: '100%',
              left: '',
              scale: '2'
            }}
          />
        </div>
      </section>
      {/* <Obstacle
        image={obstacleUrls.bush}
        style={{
          top: '60vh',
          left: '10vw',
          scale: '1'
        }}
      />
      <Obstacle
        image={obstacleUrls.bush}
        style={{
          top: '30vh',
          left: '80vw',
          scale: '1'
        }}
      /> */}
      <InventoryDialog />
      <StatsDisplay />
    </>
  )
}