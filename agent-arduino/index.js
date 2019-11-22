'use strict'

const five = require('johnny-five')
// const platziverseAgent = require('../platziverse-agent')

let board = new five.Board()

// const agent = new platziverseAgent({
//   name: 'arduino',
//   username: 'alex',
//   interval: 1000,
//   mqtt: {
//     host: 'http://localhost'
//   }
// })

board.on('ready', function () {
  console.log('as')
  // const sensor = new five.Thermometer({
  //   controller: 'LM35',
  //   pin: 'A0'
  // })
  // sensor.on('change', function () {
  //   console.log(this.celsius)
  // })
})
