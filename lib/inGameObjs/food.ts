const food: Item[] = [
    {
      name: 'Apple',
      description: 'Restores 5 HP',
      imgUrl: 'https://i.imgur.com/wmFw6qD.png',
      price: 20,
      category: 'ingestible',
      addHP: 5
    },
    {
      name: 'Poisoned Apple',
      description: 'Inflicts poison to affected user',
      imgUrl: 'https://i.imgur.com/iP4TrIW.png',
      price: 10,
      category: 'ingestible',
      addDebuff: 'Poison'
    },
    {
      name: 'Beer',
      description: 'Restores 25 HP with a high chance of confusion',
      imgUrl: 'https://i.imgur.com/LmzU6Xu.png',
      price: 50,
      category: 'ingestible',
      addHP: 25
    },
    {
      name: 'Chicken Leg',
      description: 'Restores 25 HP',
      imgUrl: 'https://i.imgur.com/otneiAp.png',
      price: 30,
      category: 'ingestible',
      addHP: 25
    },
    {
      name: 'Eggplant',
      description: 'Restores 10 HP',
      imgUrl: 'https://i.imgur.com/97OYYPa.png',
      price: 25,
      category: 'ingestible',
      addHP: 10
    },
    {
      name: 'Marmalade',
      description: 'Restores 15 HP with fire resistance',
      imgUrl: 'https://i.imgur.com/WD6SvLX.png',
      price: 30,
      category: 'ingestible',
      addHP: 15
    },
    {
      name: 'Sashimi',
      description: 'Restores 50 HP',
      imgUrl: 'https://i.imgur.com/LBQLzcT.png',
      price: 50,
      category: 'ingestible',
      addHP: 50
    },
    {
      name: 'Sushi',
      description: 'Restores 50 HP with a small chance of doing a happy dance',
      imgUrl:'https://i.imgur.com/dNLEwxr.png',
      price: 45,
      category: 'ingestible',
      addHP: 50
    },
    {
      name: 'Watermelon',
      description: 'Restores 10 HP',
      imgUrl: 'https://i.imgur.com/Oxc0BJk.png',
      price: 25,
      category: 'ingestible',
      addHP: 10
    }
]

export default food