'use client'

import { lazy } from "react";
import Character from "./components/Character/Character";
import InteractBtns from "./components/InteractBtns/InteractBtns";
import Obstacle from "./components/Obstacle/Obstactle";
import food from "@/lib/inGameObjs/food";
import StatsDisplay from "./components/StatsDisplay/StatsDisplay";
import obstacleUrls from "@/lib/inGameObjs/obstactleUrls";

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
        image='/woodenCart.PNG'
        style={{
          top: '40vh',
          left: '25vw',
          scale: '1'
        }}
      />
      <Obstacle
        image={obstacleUrls.bush}
        style={{
          top: '30vh',
          left: '10vw',
          scale: '1'
        }}
      />
      <InventoryDialog />
      <StatsDisplay />
    </>
  )
}