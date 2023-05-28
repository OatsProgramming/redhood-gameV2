'use client'

import { lazy } from "react";
import Character from "./components/Character/Character";
import InteractBtns from "./components/InteractBtns/InteractBtns";
import Obstacle from "./components/Obstacle/Obstactle";
import food from "@/lib/inGameObjs/food";
import StatsDisplay from "./components/StatsDisplay/StatsDisplay";
import obstacleUrls from "@/lib/inGameObjs/obstactleUrls";
import equipments from "@/lib/inGameObjs/equipments";
import materials from "@/lib/inGameObjs/materials";
import potions from "@/lib/inGameObjs/potions";

const InventoryDialog = lazy(() =>
  import('./components/Dialog/InventoryDialog/InventoryDialog')
)

export default function App() {
  return (
    <>
      <InteractBtns />
      <Character />
      <Obstacle
        isInteractive
        items={food}
        image={obstacleUrls.stall}
        style={{
          top: '40vh',
          left: '50vw',
          scale: '1'
        }}
      />
      <Obstacle
        isInteractive
        items={equipments}
        image='/woodenCart.PNG'
        style={{
          top: '40vh',
          left: '30vw',
          scale: '1'
        }}
      />
      <Obstacle
        isInteractive
        items={potions}
        image='/woodenCart.PNG'
        style={{
          top: '40vh',
          left: '10vw',
          scale: '1'
        }}
      />
      <Obstacle
        image={obstacleUrls.bush}
        style={{
          top: '60vh',
          left: '10vw',
          scale: '1'
        }}
      />
      <Obstacle
        image={'https://i.imgur.com/9ee7fKN.png'}
        style={{
          top: '60vh',
          left: '50vw',
          scale: '3',
        }}
        hitBoxStyle={{
          width: 30,
          left: '-3px'
        }}
      />
      <InventoryDialog />
      <StatsDisplay />
    </>
  )
}