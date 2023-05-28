const fruits: Item[] = [
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
      name: 'Peach Jam',
      description: 'Restores 15 HP',
      imgUrl: 'https://i.imgur.com/WD6SvLX.png',
      price: 30,
      category: 'ingestible',
      addHP: 15
    },
    {
      name: 'Watermelon',
      description: 'Restores 10 HP',
      imgUrl: 'https://i.imgur.com/Oxc0BJk.png',
      price: 25,
      category: 'ingestible',
      addHP: 10
    },
]

export default fruits